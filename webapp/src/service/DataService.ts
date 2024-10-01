import {
	ping,
	getProfile,
	login,
	saveConfig,
	readMessages,
} from './ApiService';
import { IConfigPayload, IEmailMetricsResponse, IProfile } from './interface';

export let profileInfo: IProfile = null;
export let config: IConfigPayload = { groupBy: 0, pageSize: 100 };
export let emailMetrics: IEmailMetricsResponse = null;

export const isApplicationOnline = async () => {
	const promise = await ping();
	if (promise === 'pong') {
		return true;
	}
	return false;
};

export const getUserProfile = async () => {
	const promise: IProfile = await getProfile();
	profileInfo = promise;
	return profileInfo;
};

export const loginUser = () => {
	return login();
};

export const saveConfigurations = (props: IConfigPayload) => {
	return saveConfig(props);
};

export const getMessages = async (pageNumber: number) => {
	emailMetrics = await readMessages(pageNumber);
	return emailMetrics;
};

export const getUpdatedEmailMetrics = () => {
	return emailMetrics.data;
};
