import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography, Avatar, Box, Button, Divider, Drawer, Hidden, List, makeStyles } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';
import AccountIcon from '@material-ui/icons/AccountCircle';
import StatisticsIcon from '@material-ui/icons/Equalizer';
import InboxIcon from '@material-ui/icons/AllInbox';
import SettingsIcon from '@material-ui/icons/Settings';
import NavItem from './NavItem';
import { AuthUserContext } from '../../../session';
import WithDashboardNavigate from '../../../session/WithDashboardNavigate';
import * as ROLES from '../../../constants/roles';
import * as NAVIGATE_ROUTES from '../../../constants/navigateRoutes';

const user = {
	avatar: '/static/images/avatars/avatar_6.png',
};

const itemsUser = [
	{
		href: NAVIGATE_ROUTES.DASHBOARD.path,
		icon: DashboardIcon,
		title: NAVIGATE_ROUTES.DASHBOARD.title,
	},
	{
		href: NAVIGATE_ROUTES.SEARCH.path,
		icon: SearchIcon,
		title: NAVIGATE_ROUTES.SEARCH.title,
	},
	{
		href: NAVIGATE_ROUTES.CREATE.path,
		icon: CreateIcon,
		title: NAVIGATE_ROUTES.CREATE.title,
	},
	{
		href: NAVIGATE_ROUTES.ACCOUNT.path,
		icon: AccountIcon,
		title: NAVIGATE_ROUTES.ACCOUNT.title,
	},
	{
		href: NAVIGATE_ROUTES.SETTINGS.path,
		icon: SettingsIcon,
		title: NAVIGATE_ROUTES.SETTINGS.title,
	},
];

const itemsAdmin = [
	{
		href: NAVIGATE_ROUTES.DASHBOARD.path,
		icon: DashboardIcon,
		title: NAVIGATE_ROUTES.DASHBOARD.title,
	},
	{
		href: NAVIGATE_ROUTES.SEARCH.path,
		icon: SearchIcon,
		title: NAVIGATE_ROUTES.SEARCH.title,
	},
	{
		href: NAVIGATE_ROUTES.CREATE.path,
		icon: CreateIcon,
		title: NAVIGATE_ROUTES.CREATE.title,
	},
	{
		href: NAVIGATE_ROUTES.SUBMISSIONS.path,
		icon: StatisticsIcon,
		title: NAVIGATE_ROUTES.SUBMISSIONS.title,
	},
	{
		href: NAVIGATE_ROUTES.ACCOUNT.path,
		icon: AccountIcon,
		title: NAVIGATE_ROUTES.ACCOUNT.title,
	},
	{
		href: NAVIGATE_ROUTES.INBOX.path,
		icon: InboxIcon,
		title: NAVIGATE_ROUTES.INBOX.title,
	},
	{
		href: NAVIGATE_ROUTES.SETTINGS.path,
		icon: SettingsIcon,
		title: NAVIGATE_ROUTES.SETTINGS.title,
	},
];

const useStyles = makeStyles(theme => ({
	mobileDrawer: {
		width: 256,
		backgroundColor: theme.palette.primary.main,
	},
	desktopDrawer: {
		width: 256,
		top: 64,
		height: 'calc(100% - 64px)',
		backgroundColor: theme.palette.primary.main,
	},
	avatar: {
		cursor: 'pointer',
		width: 64,
		height: 64,
	},
}));

function NavBarBase({ onMobileClose, openMobile, authUser, dashboardNavigater }) {
	const classes = useStyles();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (openMobile && onMobileClose) {
			onMobileClose();
		}
		dashboardNavigater(navigate, location.pathname);
	}, [location.pathname, authUser]);

	/**
	 * Generates current users menu.
	 * NOTE: highest authority comes first like Admin, User, Plummer,Anonymous
	 */
	function contentSelector() {
		// return no content if no user is signed in anonymousely.
		// TODO: Could do this better consider user experianse on failed Internet connection
		if (!authUser || !Array.isArray(authUser.roles)) return null;
		if (authUser.roles.includes(ROLES.ADMIN)) {
			return (
				<div>
					<Box height="100%" display="flex" flexDirection="column">
						<Box alignItems="center" display="flex" flexDirection="column" p={2}>
							<Avatar className={classes.avatar} component={RouterLink} src={user.avatar} to="/app/account" />
							<Typography className={classes.name} color="textPrimary" variant="h5">
								{authUser ? authUser.displayName : ''}
							</Typography>
						</Box>
						<Divider />
						<Box p={2}>
							<List>
								{itemsAdmin.map(item => (
									<NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
								))}
							</List>
						</Box>
						<Box flexGrow={1} />
						<Box p={2} m={2} bgcolor="background.dark">
							<Typography align="center" gutterBottom variant="h4">
								Greta's Week's
							</Typography>
							<Typography align="center" variant="body2">
								Greta Thunberg's Week's in pictures and more · Photography and videography
							</Typography>
							<Box display="flex" justifyContent="center" mt={2}>
								<Button
									color="primary"
									component="a"
									href="https://www.facebook.com/Greta-Thunbergs-Weeks-in-pictures-and-more-246201326553309"
									variant="contained"
								>
									Visit Us at Facebook
								</Button>
							</Box>
						</Box>
					</Box>
				</div>
			);
		}
		if (authUser.roles.includes(ROLES.USER)) {
			return (
				<div>
					<Box height="100%" display="flex" flexDirection="column">
						<Box alignItems="center" display="flex" flexDirection="column" p={2}>
							<Avatar className={classes.avatar} component={RouterLink} src={user.avatar} to="/app/account" />
							<Typography className={classes.name} color="textPrimary" variant="h5">
								{authUser ? authUser.displayName : ''}
							</Typography>
						</Box>
						<Divider />
						<Box p={2}>
							<List>
								{itemsUser.map(item => (
									<NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
								))}
							</List>
						</Box>
						<Box flexGrow={1} />
						<Box p={2} m={2} bgcolor="background.dark">
							<Typography align="center" gutterBottom variant="h4">
								Greta's Week's
							</Typography>
							<Typography align="center" variant="body2">
								Greta Thunberg's Week's in pictures and more · Photography and videography
							</Typography>
							<Box display="flex" justifyContent="center" mt={2}>
								<Button
									color="primary"
									component="a"
									href="https://www.facebook.com/Greta-Thunbergs-Weeks-in-pictures-and-more-246201326553309"
									variant="contained"
								>
									Visit Us at Facebook
								</Button>
							</Box>
						</Box>
					</Box>
				</div>
			);
		}
		if (authUser.roles.includes(ROLES.ANON)) {
			return (
				<Box height="100%" display="flex" flexDirection="column">
					<Box alignItems="center" display="flex" flexDirection="column" p={2}>
						<Avatar className={classes.avatar} component={RouterLink} src={user.avatar} to="/app/account" />
						<Typography className={classes.name} color="textPrimary" variant="h5">
							{authUser ? authUser.displayName : ''}
						</Typography>
					</Box>
					<Divider />
					<Box flexGrow={1} />
					<Box p={2} m={2} bgcolor="background.dark">
						<Typography align="center" gutterBottom variant="h4">
							Greta's Week's
						</Typography>
						<Typography align="center" variant="body2">
							Greta Thunberg's Week's in pictures and more · Photography and videography
						</Typography>
						<Box display="flex" justifyContent="center" mt={2}>
							<Button
								color="primary"
								component="a"
								href="https://www.facebook.com/Greta-Thunbergs-Weeks-in-pictures-and-more-246201326553309"
								variant="contained"
							>
								Visit Us at Facebook
							</Button>
						</Box>
					</Box>
				</Box>
			);
		}

		if (authUser.roles.includes(ROLES.ADMIN)) {
			return (
				<div>
					<Box height="100%" display="flex" flexDirection="column">
						<Box alignItems="center" display="flex" flexDirection="column" p={2}>
							<Avatar className={classes.avatar} component={RouterLink} src={user.avatar} to="/app/account" />
							<Typography className={classes.name} color="textPrimary" variant="h5">
								{authUser ? authUser.displayName : ''}
							</Typography>
						</Box>
						<Divider />
						<Box p={2}>
							<List>
								{itemsAdmin.map(item => (
									<NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
								))}
							</List>
						</Box>
						<Box flexGrow={1} />
						<Box p={2} m={2} bgcolor="background.dark">
							<Typography align="center" gutterBottom variant="h4">
								Greta's Week's
							</Typography>
							<Typography align="center" variant="body2">
								Greta Thunberg's Week's in pictures and more · Photography and videography
							</Typography>
							<Box display="flex" justifyContent="center" mt={2}>
								<Button
									color="primary"
									component="a"
									href="https://www.facebook.com/Greta-Thunbergs-Weeks-in-pictures-and-more-246201326553309"
									variant="contained"
								>
									Visit Us at Facebook
								</Button>
							</Box>
						</Box>
					</Box>
				</div>
			);
		}
		return null;
	}

	return (
		<>
			<Hidden lgUp>
				<Drawer
					anchor="left"
					classes={{ paper: classes.mobileDrawer }}
					onClose={onMobileClose}
					open={openMobile}
					variant="temporary"
				>
					{contentSelector()}
				</Drawer>
			</Hidden>
			<Hidden mdDown>
				<Drawer anchor="left" classes={{ paper: classes.desktopDrawer }} open variant="persistent">
					{contentSelector()}
				</Drawer>
			</Hidden>
		</>
	);
}

const NavBar = props => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div>
				<NavBarBase {...props} authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

NavBar.propTypes = {
	onMobileClose: PropTypes.func,
	openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
	onMobileClose: () => {},
	openMobile: false,
};

export default WithDashboardNavigate(NavBar);
