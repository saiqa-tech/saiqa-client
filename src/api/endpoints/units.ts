import client from "../client";
import type { AxiosResponse } from "axios";
import { PaginationParams, PaginatedResponse } from "../../types/common";

export interface Unit {
	id: string;
	name: string;
	// Add other fields matching backend contract
}

export const getUnits = async (params: PaginationParams): Promise<AxiosResponse<PaginatedResponse<Unit>>> => {
	return client.get<PaginatedResponse<Unit>>("/units", { params });
};
