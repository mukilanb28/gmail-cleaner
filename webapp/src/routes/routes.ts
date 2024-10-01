interface IRouteInformation {
	[key: string]: { pathname: string; title: string };
}

export const APP_ROUTES: IRouteInformation = {
	HOME: {
		pathname: '/',
		title: 'Home',
	},
	OVERVIEW: {
		pathname: '/overview',
		title: 'Overview',
	},
	SETTINGS: {
		pathname: '/settings',
		title: 'Settings',
	},
};
