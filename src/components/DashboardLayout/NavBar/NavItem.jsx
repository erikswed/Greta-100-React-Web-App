import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Button, ListItem, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	item: {
		display: 'flex',
		paddingTop: 0,
		paddingBottom: 0,
	},
	button: {
		color: theme.palette.text.primary,
		fontWeight: theme.typography.fontWeightMedium,
		justifyContent: 'flex-start',
		letterSpacing: 0,
		padding: '10px 8px',
		textTransform: 'none',
		width: '100%',
		'& $title': {
			fontSize: 20,
			fontWeight: theme.typography.fontWeightBold,
		},
		'& $icon': {
			color: theme.palette.primary.light,
		},
	},
	icon: {
		marginRight: theme.spacing(1),
	},
	title: {
		marginRight: 'auto',
	},
}));

const NavItem = ({ className, href, icon: Icon, title, ...rest }) => {
	const classes = useStyles();

	function handleClick() {
		localStorage.setItem('currentDashBoardView', href);
	}

	return (
		<ListItem className={clsx(classes.item, className)} disableGutters {...rest}>
			<Button className={classes.button} component={RouterLink} to={href} onClick={handleClick}>
				{Icon && <Icon className={classes.icon} size="20" />}
				<span className={classes.title}>{title}</span>
			</Button>
		</ListItem>
	);
};

NavItem.propTypes = {
	className: PropTypes.string,
	href: PropTypes.string,
	icon: PropTypes.elementType,
	title: PropTypes.string,
};

NavItem.defaultProps = {
	className: '',
	href: '',
	icon: null,
	title: '',
};

export default NavItem;
