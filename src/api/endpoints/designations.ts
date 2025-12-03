import client from "../client";

export const getDesignations = async (params: any) => {
	return client.get("/designations", { params });
};
