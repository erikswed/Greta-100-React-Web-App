import React from 'react';
import AuthUserContext from './context';
import * as ROLES from '../constants/roles';
import * as NAVIGATE_ROUTES from '../constants/navigateRoutes';
import { NAVIGATE_ROUTES_MAP } from '../constants/navigateRoutes';

const WithDashboardNavigate = Component => {
	const WithDashboardBase = props => {
		const onDashboard = (navigate, pathname) => {
			const { authUser } = props;
			if (authUser) {
				if (authUser.roles.includes(ROLES.ANON)) {
					if (pathname === NAVIGATE_ROUTES.REGISTER.path) {
						navigate(NAVIGATE_ROUTES.REGISTER.path);
					} else if (pathname === NAVIGATE_ROUTES.LOGIN.path) {
						navigate(NAVIGATE_ROUTES.LOGIN.path);
					} else {
						navigate(NAVIGATE_ROUTES.LOGIN.path);
					}
				} else if (authUser.roles.includes(ROLES.USER) || authUser.roles.includes(ROLES.ADMIN)) {
					// get last dashboard view user have visisted like, seach, settings or account
					const view = localStorage.getItem('currentDashBoardView');
					let nav = false;
					// Here if user has used nav menu earlier then that last view is loaded
					Object.values(NAVIGATE_ROUTES_MAP).forEach(element => {
						// this check is if user have done local storage edition in the browser manipulation the 'currentDashBoardView' values
						if (view && view === element.path) {
							navigate(view);
							nav = true;
						}
					});
					// if sp default to dashboard
					if (!nav) navigate(NAVIGATE_ROUTES.DASHBOARD.path);
				}
			}
		};

		return <Component dashboardNavigater={onDashboard} {...props} />;
	};

	const WithDashboard = (
		props, // Pass props from here as well
	) => (
		<AuthUserContext.Consumer>
			{authUser => (
				<div>
					<WithDashboardBase authUser={authUser} {...props} />
				</div>
			)}
		</AuthUserContext.Consumer>
	);

	return WithDashboard;
};

export default WithDashboardNavigate;
