import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Checkbox,
	Divider,
	FormControlLabel,
	Grid,
	Typography,
	makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {},
	item: {
		display: 'flex',
		flexDirection: 'column',
	},
	card: {
		backgroundColor: theme.palette.primary.main,
	},
}));

const Notifications = ({ className, ...rest }) => {
	const classes = useStyles();

	return (
		<form className={clsx(classes.root, className)} {...rest}>
			<Card className={classes.card}>
				<CardHeader subheader="Manage the notifications" title="Notifications" />
				<Typography gutterBottom variant="6" color="textSecondary">
					(This is an example showing how it can look like)
				</Typography>
				<Divider />
				<CardContent>
					<Grid container spacing={6} wrap="wrap">
						<Grid className={classes.item} item md={4} sm={6} xs={12}>
							<Typography color="textPrimary" gutterBottom variant="h5">
								Notifications
							</Typography>
							<FormControlLabel control={<Checkbox defaultChecked />} label="Email" />
							<FormControlLabel control={<Checkbox defaultChecked />} label="Push Notifications" />
							<FormControlLabel control={<Checkbox />} label="Text Messages" />
							<FormControlLabel control={<Checkbox defaultChecked />} label="Phone calls" />
						</Grid>
						<Grid className={classes.item} item md={4} sm={6} xs={12}>
							<Typography color="textPrimary" gutterBottom variant="h6">
								Messages
							</Typography>
							<FormControlLabel control={<Checkbox defaultChecked />} label="Email" />
							<FormControlLabel control={<Checkbox />} label="Push Notifications" />
							<FormControlLabel control={<Checkbox defaultChecked />} label="Phone calls" />
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<Box display="flex" justifyContent="flex-end" p={2}>
					<Button color="primary" variant="contained">
						Save
					</Button>
				</Box>
			</Card>
		</form>
	);
};

Notifications.propTypes = {
	className: PropTypes.string,
};

Notifications.defaultProps = {
	className: '',
};

export default Notifications;
