import type { User } from "../../types/auth";
import client from "../client";

export const login = async (credentials: any) => {
	return client.post("/auth/login", credentials);
};

export const logout = async () => {
	return client.post("/auth/logout");
};

export const getMe = async () => {
	return client.get<{ user: User; expiresAt: number }>("/auth/me");
};

export const changePassword = async (data: any) => {
	return client.post("/auth/change-password", data);
};
