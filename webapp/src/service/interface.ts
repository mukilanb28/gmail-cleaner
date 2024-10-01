export interface IProfile {
	emailAddress: string | null;
}
export interface IConfigPayload {
	groupBy: number;
	pageSize: number;
}

export interface IEmailMetrics {
	id: number;
	name: string;
	count: number;
}
export interface IEmailMetricsResponse {
	data: IEmailMetrics[];
	hasNextPage: boolean;
}
