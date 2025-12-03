import client from "../client";

export const getUnits = async (params: any) => {
	return client.get("/units", { params });
};
