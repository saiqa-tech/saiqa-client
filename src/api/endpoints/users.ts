import type { PaginatedResponse } from "../../types/common";
import type {
	CreateUserRequest,
	UpdateUserRequest,
	UserDetail,
	UsersListParams,
} from "../../types/user";
import client from "../client";

// Helper function to transform backend user data to frontend format
function transformUser(user: any): UserDetail {
	return {
		id: user.id,
		email: user.email,
		firstName: user.first_name,
		lastName: user.last_name,
		role: user.role,
		unitId: user.unit_id,
		designationId: user.designation_id,
		createdAt: user.created_at,
		updatedAt: user.updated_at,
		lastLogin: user.last_login,
		status: user.is_active ? "active" : "inactive",
		unit: user.unit_name
			? { id: user.unit_id, name: user.unit_name }
			: undefined,
		designation: user.designation_title
			? { id: user.designation_id, title: user.designation_title }
			: undefined,
	};
}

export const getUsers = async (params: UsersListParams) => {
	const response = await client.get<{
		users: any[];
		pagination: {
			page: number;
			limit: number;
			total: number;
			totalPages: number;
		};
	}>("/users", { params });

	// Transform backend response to match PaginatedResponse type
	const transformedData: PaginatedResponse<UserDetail> = {
		data: response.data.users.map(transformUser),
		total: response.data.pagination.total,
		page: response.data.pagination.page,
		limit: response.data.pagination.limit,
		totalPages: response.data.pagination.totalPages,
	};

	return { ...response, data: transformedData };
};

export const getUser = async (id: string) => {
	const response = await client.get<{ user: any }>(`/users/${id}`);
	const transformedData = transformUser(response.data.user);
	return { ...response, data: transformedData };
};

export const createUser = async (data: CreateUserRequest) => {
	// Transform frontend request to backend format
	// Password is optional - server will generate if not provided
	const backendData = {
		email: data.email,
		password: data.password, // Optional - server generates if not provided
		firstName: data.firstName,
		lastName: data.lastName,
		role: data.role,
		unitId: data.unitId,
		designationId: data.designationId,
	};

	const response = await client.post<{ user: any; generatedPassword?: string }>("/users", backendData);
	const transformedData = transformUser(response.data.user);

	// Return both user data and generated password (if any)
	return {
		...response,
		data: {
			...transformedData,
			generatedPassword: response.data.generatedPassword
		}
	};
};

export const updateUser = async (id: string, data: UpdateUserRequest) => {
	// Transform frontend request to backend format
	const backendData: any = {};
	if (data.firstName !== undefined) backendData.firstName = data.firstName;
	if (data.lastName !== undefined) backendData.lastName = data.lastName;
	if (data.role !== undefined) backendData.role = data.role;
	if (data.unitId !== undefined) backendData.unitId = data.unitId;
	if (data.designationId !== undefined)
		backendData.designationId = data.designationId;
	if (data.status !== undefined)
		backendData.isActive = data.status === "active";

	const response = await client.put<{ user: any }>(`/users/${id}`, backendData);
	const transformedData = transformUser(response.data.user);
	return { ...response, data: transformedData };
};

export const deleteUser = async (id: string) => {
	return client.delete(`/users/${id}`);
};

export const resetPassword = async (id: string) => {
	const response = await client.post<{ message: string; newPassword: string }>(
		`/users/${id}/reset-password`,
		{}, // No body needed - server generates password
	);

	return response;
};
