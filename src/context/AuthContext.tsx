import { useNavigate } from "@tanstack/react-router";
import {
	createContext,
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import client from "../api/client";
import { SessionTimeoutModal } from "../components/SessionTimeoutModal";
import type { AuthState, User } from "../types/auth";

interface AuthContextType extends AuthState {
	login: (data: { user: User; expiresAt: number }) => void;
	logout: () => void;
	checkAuth: () => Promise<void>;
	refreshToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const WARNING_THRESHOLD = 5 * 60 * 1000; // 5 minutes

export function AuthProvider({ children }: { children: ReactNode }) {
	const [state, setState] = useState<AuthState>({
		user: null,
		isAuthenticated: false,
		isLoading: true,
		expiresAt: null,
	});
	const [showTimeoutModal, setShowTimeoutModal] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const navigate = useNavigate();

	const login = (data: { user: User; expiresAt: number }) => {
		setState({
			user: data.user,
			isAuthenticated: true,
			isLoading: false,
			expiresAt: data.expiresAt,
		});
		localStorage.setItem("auth_expires_at", data.expiresAt.toString());
	};

	const logout = async () => {
		try {
			await client.post("/auth/logout");
		} catch (error) {
			console.error("Logout failed", error);
		} finally {
			setState({
				user: null,
				isAuthenticated: false,
				isLoading: false,
				expiresAt: null,
			});
			setShowTimeoutModal(false);
			localStorage.removeItem("auth_expires_at");
			navigate({ to: "/login" });
		}
	};

	const refreshToken = async () => {
		try {
			const response = await client.post("/auth/refresh");
			const { user, expiresAt } = response.data;
			setState((prev) => ({
				...prev,
				user,
				expiresAt,
				isAuthenticated: true,
			}));
			localStorage.setItem("auth_expires_at", expiresAt.toString());
			setShowTimeoutModal(false);
		} catch (error) {
			console.error("Refresh failed", error);
			logout();
		}
	};

	const checkAuth = useCallback(async () => {
		try {
			const response = await client.get("/auth/me", { _skipAuthRedirect: true } as any);
			// response.data is { user, expiresAt }
			const { user, expiresAt } = response.data;
			setState({
				user,
				isAuthenticated: true,
				isLoading: false,
				expiresAt,
			});
			localStorage.setItem("auth_expires_at", expiresAt.toString());
		} catch (error) {
			setState({
				user: null,
				isAuthenticated: false,
				isLoading: false,
				expiresAt: null,
			});
			localStorage.removeItem("auth_expires_at");
		}
	}, []);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		// Register the logout function to handle 401 Unauthorized responses
		import("../api/client").then(({ setOnUnauthorized }) => {
			setOnUnauthorized(logout);
		});
	}, []);

	// Session Monitor
	useEffect(() => {
		if (!state.isAuthenticated || !state.expiresAt) {
			if (timerRef.current) clearInterval(timerRef.current);
			return;
		}

		const monitorSession = () => {
			const now = Date.now();
			const timeLeft = (state.expiresAt as number) - now;

			if (timeLeft <= 0) {
				// Expired
				logout();
			} else if (timeLeft <= WARNING_THRESHOLD) {
				// Show warning
				if (!showTimeoutModal) setShowTimeoutModal(true);
			} else {
				// Hide warning if we refreshed
				if (showTimeoutModal) setShowTimeoutModal(false);
			}
		};

		// Check every second
		timerRef.current = setInterval(monitorSession, 1000);

		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [state.isAuthenticated, state.expiresAt, showTimeoutModal]);

	return (
		<AuthContext.Provider
			value={{ ...state, login, logout, checkAuth, refreshToken }}
		>
			{children}
			<SessionTimeoutModal
				isOpen={showTimeoutModal}
				onRefresh={refreshToken}
				onLogout={logout}
				expiresAt={state.expiresAt}
			/>
		</AuthContext.Provider>
	);
}
