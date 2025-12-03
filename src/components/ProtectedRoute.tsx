import { Navigate, useLocation } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isAuthenticated, isLoading } = useAuth();
	const location = useLocation();

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" search={{ redirect: location.pathname + location.search }} />;
	}

	return <>{children}</>;
}
