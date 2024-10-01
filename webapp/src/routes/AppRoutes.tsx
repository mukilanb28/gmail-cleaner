import React from 'react';
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Navigate,
} from 'react-router-dom';
import { AppLayout, ErrorBoundaryFallback, NotFound } from '../layouts';
import { APP_ROUTES } from './routes';
import { Home } from '../pages/home/Home';
import { Settings } from '../pages/settings/Settings';

export const AppRoutes: React.FC = () => {
	const routes = createRoutesFromElements(
		<Route
			path="/"
			element={<AppLayout />}
			errorElement={<ErrorBoundaryFallback />}>
			<Route
				path={APP_ROUTES.HOME.pathname}
				element={<Navigate to={APP_ROUTES.OVERVIEW.pathname} />}
			/>
			<Route
				path={APP_ROUTES.OVERVIEW.pathname}
				element={<Home />}
			/>
			<Route
				path={APP_ROUTES.SETTINGS.pathname}
				element={<Settings />}
			/>
			<Route
				path={'/redirect'}
				element={<Settings />}
			/>

			<Route
				path="page-not-found"
				element={<NotFound />}
			/>
			<Route
				path="*"
				element={<NotFound />}
			/>
		</Route>
	);
	return <RouterProvider router={createBrowserRouter(routes)} />;
};
