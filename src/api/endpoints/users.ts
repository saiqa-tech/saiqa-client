import type { PaginatedResponse } from "../../types/common";
import type {
	CreateUserRequest,
	UpdateUserRequest,
	UserDetail,
	ResetPasswordResponse,
	UsersListParams,
} from "../../types/user";
import client from "../client";

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
		data: response.data.users.map((user: any) => ({
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
		})),
		total: response.data.pagination.total,
		page: response.data.pagination.page,
		limit: response.data.pagination.limit,
		totalPages: response.data.pagination.totalPages,
	};

	return { ...response, data: transformedData };
};

export const getUser = async (id: string) => {
	const response = await client.get<{ user: any }>(`/users/${id}`);

	// Transform backend response to match UserDetail type
	const user = response.data.user;
	const transformedData: UserDetail = {
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

	return { ...response, data: transformedData };
};

export const createUser = async (data: CreateUserRequest) => {
	// Transform frontend request to backend format
	const backendData = {
		email: data.email,
		password: data.password || generateRandomPassword(),
		firstName: data.firstName,
		lastName: data.lastName,
		role: data.role,
		unitId: data.unitId,
		designationId: data.designationId,
	};

	const response = await client.post<{ user: any }>("/users", backendData);

	// Transform backend response to match UserDetail type
	const user = response.data.user;
	const transformedData: UserDetail = {
		id: user.id,
		email: user.email,
		firstName: user.first_name,
		lastName: user.last_name,
		role: user.role,
		unitId: user.unit_id,
		designationId: user.designation_id,
		createdAt: user.created_at,
		updatedAt: user.updated_at,
		status: user.is_active ? "active" : "inactive",
	};

	return { ...response, data: transformedData };
};

// Helper function to generate random password
function generateRandomPassword(): string {
	const length = 12;
	const charset =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
	let password = "";
	for (let i = 0; i < length; i++) {
		password += charset.charAt(Math.floor(Math.random() * charset.length));
	}
	return password;
}

export const updateUser = async (id: string, data: UpdateUserRequest) => {
	// Transform frontend request to backend format
	const backendData: any = {};
	if (data.firstName) backendData.firstName = data.firstName;
	if (data.lastName) backendData.lastName = data.lastName;
	if (data.role) backendData.role = data.role;
	if (data.unitId !== undefined) backendData.unitId = data.unitId;
	if (data.designationId !== undefined)
		backendData.designationId = data.designationId;
	if (data.status !== undefined)
		backendData.isActive = data.status === "active";

	const response = await client.put<{ user: any }>(`/users/${id}`, backendData);

	// Transform backend response to match UserDetail type
	const user = response.data.user;
	const transformedData: UserDetail = {
		id: user.id,
		email: user.email,
		firstName: user.first_name,
		lastName: user.last_name,
		role: user.role,
		unitId: user.unit_id,
		designationId: user.designation_id,
		createdAt: user.created_at,
		updatedAt: user.updated_at,
		status: user.is_active ? "active" : "inactive",
	};

	return { ...response, data: transformedData };
};

export const deleteUser = async (id: string) => {
	return client.delete(`/users/${id}`);
};

export const resetPassword = async (id: string) => {
	// Generate a new random password
	const newPassword = generateRandomPassword();

	const response = await client.post<{ message: string }>(
		`/users/${id}/reset-password`,
		{ newPassword },
	);

	return {
		...response,
		data: { newPassword },
	};
};
