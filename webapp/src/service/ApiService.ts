import { IConfigPayload, IEmailMetricsResponse } from './interface';

export const BASE_URL = 'http://localhost:3001';
const PING = '/ping';
const LOGIN = '/api/login';
const PROFILE = '/api/profile';
const GET_METRCIS = '/api/getMetrics';
const DELETE_MESSAGES = '/api/batchDelete';
const RESET = '/api/reset';
const SAVE_CONFIG = '/api/saveConfig';

const handleError = (x: any) => {
	console.error(`API ERROR :`, x);
};

export const ping = async () => {
	const URL = `${BASE_URL}${PING}`;
	return fetch(URL)
		.then((x) => x.json())
		.catch(handleError);
};

export const getProfile = async () => {
	const URL = `${BASE_URL}${PROFILE}`;
	return fetch(URL)
		.then((x) => x.json())
		.catch(handleError);
};

export const login = async () => {
	const URL = `${BASE_URL}${LOGIN}`;
	return fetch(URL)
		.then((x) => x.json())
		.catch(handleError);
};

export const readMessages = async (
	pageNumber = 1
): Promise<IEmailMetricsResponse> => {
	const URL = `${BASE_URL}${GET_METRCIS}?pageNumber=${pageNumber}`;
	return fetch(URL)
		.then((x) => x.json())
		.catch(handleError);
};

export const deleteMessages = async () => {
	const URL = `${BASE_URL}${DELETE_MESSAGES}`;
	return fetch(URL)
		.then((x) => x.json())
		.catch(handleError);
};
export const saveConfig = async (payload: IConfigPayload) => {
	const URL = `${BASE_URL}${SAVE_CONFIG}`;
	return fetch(URL, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	})
		.then((x) => x.json())
		.catch(handleError);
};
