import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { AppBar, Badge, Box, Hidden, IconButton, Toolbar, makeStyles, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import ThemeSwitcherComponent from './NavBar/ThemeSwitsher';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.primary.main,
	},
	avatar: {
		width: 60,
		height: 60,
	},

	button: {
		display: 'flex',
		margin: '10px',
		padding: '10px',
		boxShadow: theme.shadows[5],
		background: theme.palette.primary.main,
	},
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
	const classes = useStyles();
	const [notifications] = useState([]);
	const navigate = useNavigate();

	function onClick() {
		navigate('/');
	}

	return (
		<AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
			<Toolbar>
				<Button onClick={onClick} type="button" color="primary" className={classes.button} variant="contained">
					Return to Week's
				</Button>
				<Box flexGrow={1} />
				<Hidden mdDown>
					<IconButton color="inherit">
						<Badge badgeContent={notifications.length} color="primary" variant="dot">
							<NotificationsIcon />
						</Badge>
					</IconButton>
				</Hidden>
				<ThemeSwitcherComponent />
				<Hidden lgUp>
					<IconButton color="inherit" onClick={onMobileNavOpen}>
						<MenuIcon />
					</IconButton>
				</Hidden>
			</Toolbar>
		</AppBar>
	);
};

TopBar.propTypes = {
	className: PropTypes.string,
	onMobileNavOpen: PropTypes.func,
};

TopBar.defaultProps = {
	className: '',
	onMobileNavOpen: null,
};

export default TopBar;
