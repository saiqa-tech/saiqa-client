import { message } from "antd";
import axios, {
	type AxiosError,
	type AxiosInstance,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from "axios";

// Define a custom config type to include retry count
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retryCount?: number;
	_skipAuthRedirect?: boolean;
}

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

// Callback to handle 401 Unauthorized (to be set by AuthContext)
let onUnauthorizedCallback: () => void = () => { };

export const setOnUnauthorized = (callback: () => void) => {
	onUnauthorizedCallback = callback;
};

const client: AxiosInstance = axios.create({
	baseURL: '/api',//window.location.port === '3000' ? '/api' : `${window.location.protocol}//${window.location.hostname}`,
	timeout: 30000,
	withCredentials: true, // Important for cookies
});

// --- Request Interceptor ---
client.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		// Attempt to read token if available (e.g. from memory or a helper)
		// Note: Since the requirement mentions httpOnly cookies, we primarily rely on 'withCredentials: true'.
		// If there is a mechanism to get the token string (e.g. for SSR or specific auth flows), inject it here.
		const token = await getAccessToken();
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// --- Response Interceptor ---
client.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	async (error: AxiosError) => {
		const config = error.config as CustomAxiosRequestConfig;

		// --- Retry Logic for Transient Failures ---
		if (
			config &&
			!config._retryCount &&
			isTransientError(error) &&
			(config._retryCount || 0) < MAX_RETRIES
		) {
			config._retryCount = (config._retryCount || 0) + 1;

			// Exponential backoff or fixed delay
			const delay = RETRY_DELAY * config._retryCount;
			await new Promise((resolve) => setTimeout(resolve, delay));

			return client(config);
		}

		// --- Error Handling based on Status Code ---
		if (error.response) {
			const { status, data } = error.response;
			const errorMessage = (data as { message?: string })?.message || "An error occurred";

			switch (status) {
				case 401:
					// If the request explicitly asks to skip the global auth redirect, just reject
					if ((error.config as CustomAxiosRequestConfig)?._skipAuthRedirect) {
						break;
					}
					// Unauthorized: Clear session and redirect
					onUnauthorizedCallback();
					// We don't show a message here usually as the redirect explains it, 
					// but we can if desired.
					break;
				case 403:
					// Forbidden
					message.error("Permission Denied: You do not have access to this resource.");
					break;
				case 400:
					// Bad Request
					message.error(errorMessage);
					break;
				case 500:
					// Server Error
					message.error("Server error, please try again later.");
					break;
				default:
					message.error(errorMessage);
			}
		} else if (error.request) {
			// Network error (no response received)
			message.error("Network error. Please check your connection.");
		} else {
			// Something happened in setting up the request
			message.error("An unexpected error occurred.");
		}

		return Promise.reject(error);
	},
);

// Helper to determine if an error is transient (retryable)
function isTransientError(error: AxiosError): boolean {
	// Retry on network errors or 5xx server errors (optional, but requested "network instability")
	// ECONNABORTED is often a timeout
	if (error.code === "ECONNABORTED") return true;
	if (error.message.includes("Network Error")) return true;
	// Optionally retry on 503 Service Unavailable
	if (error.response?.status === 503) return true;
	return false;
}

// Placeholder for token retrieval logic
async function getAccessToken(): Promise<string | null> {
	// If you have a specific endpoint to fetch the token, implement it here.
	// For now, returning null as httpOnly cookies are handled by browser.
	return null;
}

export default client;
