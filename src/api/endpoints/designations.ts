import type { AxiosResponse } from "axios";
import client from "../client";
import type { PaginatedResponse, PaginationParams } from "../../types/common";

export interface Designation {
	id: string;
	name: string;
	// Add other fields matching backend contract
}

export const getDesignations = async (
	params: PaginationParams,
): Promise<AxiosResponse<PaginatedResponse<Designation>>> => {
	return client.get<PaginatedResponse<Designation>>("/designations", {
		params,
	});
};
