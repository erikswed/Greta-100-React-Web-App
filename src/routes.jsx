import React from 'react';
import ContentLayout from './components/structure/ContentLayout';
import DashboardLayout from './components/DashboardLayout';
import AccountView from './components/DashboardLayout/views/account/AccountView';
import SearchListView from './components/DashboardLayout/views/search/SearchListView';
import DashboardView from './components/DashboardLayout/views/dashboard/DashboardView';
import NotFoundView from './components/DashboardLayout/views/errors/NotFoundView';
import CreateContentView from './components/DashboardLayout/views/creator/CreateContentView';
import SettingsView from './components/DashboardLayout/views/settings/SettingsView';
import LoginView from './components/DashboardLayout/views/auth/LoginView';
import RegisterView from './components/DashboardLayout/views/auth/RegisterView';
import SubmissionsView from './components/DashboardLayout/views/submissions/SubmissionsView';
import InboxView from './components/DashboardLayout/views/inbox/InboxView';

const routes = [
	{
		path: 'app',
		element: <DashboardLayout />,
		children: [
			{ path: 'account', element: <AccountView /> },
			{ path: 'search', element: <SearchListView /> },
			{ path: 'dashboard', element: <DashboardView /> },
			{ path: 'create', element: <CreateContentView /> },
			{ path: 'submissions', element: <SubmissionsView /> },
			{ path: 'inbox', element: <InboxView /> },
			{ path: 'settings', element: <SettingsView /> },
			{ path: 'login', element: <LoginView /> },
			{ path: 'register', element: <RegisterView /> },
			{ path: '*', element: <NotFoundView /> },
			{ path: '/', element: <DashboardView /> },
		],
	},
	{
		path: '/',
		element: <ContentLayout />,
		children: [
			{ path: '404', element: <NotFoundView /> },
			{ path: '*', element: <NotFoundView /> },
		],
	},
];

export default routes;
