import type { User } from "./auth";

export interface UserDetail extends User {
	createdAt: string;
	updatedAt: string;
	lastLogin?: string;
	status: "active" | "inactive";
	unit?: {
		id: string;
		name: string;
	};
	designation?: {
		id: string;
		title: string;
	};
}

export interface CreateUserRequest {
	email: string;
	firstName: string;
	lastName: string;
	role: "admin" | "manager" | "user";
	unitId?: string;
	designationId?: string;
	password?: string;
}

export interface UpdateUserRequest {
	firstName?: string;
	lastName?: string;
	role?: "admin" | "manager" | "user";
	unitId?: string;
	designationId?: string;
	status?: "active" | "inactive";
}

export interface ResetPasswordResponse {
	newPassword: string;
}

export interface UsersListParams {
	page: number;
	limit: number;
	search?: string;
	role?: string;
	unitId?: string;
	designationId?: string;
}
