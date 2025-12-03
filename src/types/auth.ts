export interface User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: "admin" | "manager" | "user";
	unitId?: string;
	designationId?: string;
}

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	expiresAt: number | null;
}
