import type { User } from "../../types/auth";
import client from "../client";

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface ChangePasswordRequest {
	currentPassword: string;
	newPassword: string;
}

export const login = async (credentials: LoginCredentials) => {
	return client.post("/auth/login", credentials);
export const changePassword = async (data: ChangePasswordRequest) => {
	return client.post("/auth/change-password", data);
};port const logout = async () => {
	return client.post("/auth/logout");
};

export const getMe = async () => {
	return client.get<{ user: User; expiresAt: number }>("/auth/me");
};

export const changePassword = async (data: any) => {
	return client.post("/auth/change-password", data);
};
