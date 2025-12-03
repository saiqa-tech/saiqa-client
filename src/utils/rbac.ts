import type { User } from "../types/auth";

export const isAdmin = (user: User | null): boolean => {
	return user?.role === "admin";
};

export const isManager = (user: User | null): boolean => {
	return user?.role === "manager";
};

export const isUser = (user: User | null): boolean => {
	return user?.role === "user";
};

export const canManageUsers = (user: User | null): boolean => {
	return isAdmin(user) || isManager(user);
};
