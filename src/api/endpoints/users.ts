import type { PaginatedResponse } from "../../types/common";
import type {
	CreateUserRequest,
	UpdateUserRequest,
	UserDetail,
} from "../../types/user";
import client from "../client";

export const getUsers = async (params: any) => {
	return client.get<PaginatedResponse<UserDetail>>("/users", { params });
};

export const getUser = async (id: string) => {
	return client.get<UserDetail>(`/users/${id}`);
};

export const createUser = async (data: CreateUserRequest) => {
	return client.post<UserDetail>("/users", data);
};

export const updateUser = async (id: string, data: UpdateUserRequest) => {
	return client.put<UserDetail>(`/users/${id}`, data);
};

export const deleteUser = async (id: string) => {
	return client.delete(`/users/${id}`);
};

export const resetPassword = async (id: string) => {
	return client.post<{ newPassword: string }>(`/users/${id}/reset-password`);
};
