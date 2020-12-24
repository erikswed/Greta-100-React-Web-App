import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, CardHeader, Divider, Typography, colors, makeStyles } from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		backgroundColor: theme.palette.primary.main,
	},
}));

const TrafficByDevice = ({ className, ...rest }) => {
	const classes = useStyles();
	const devices = [
		{
			title: 'Desktop',
			value: 63,
			icon: LaptopMacIcon,
			color: colors.indigo[500],
		},
		{
			title: 'Tablet',
			value: 15,
			icon: TabletIcon,
			color: colors.red[600],
		},
		{
			title: 'Mobile',
			value: 23,
			icon: PhoneIcon,
			color: colors.orange[600],
		},
	];

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardHeader
				title={
					<Typography gutterBottom variant="h5" color="textSecondary">
						TRAFFIC BY DEVICES
					</Typography>
				}
			/>
			<Divider />
			<CardContent>
				<Box display="flex" justifyContent="center" mt={2}>
					{devices.map(({ color, icon: Icon, title, value }) => (
						<Box key={title} p={1} textAlign="center">
							<Icon color="action" />
							<Typography color="textPrimary" variant="body1">
								{title}
							</Typography>
							<Typography style={{ color }} variant="h2">
								{value}%
							</Typography>
						</Box>
					))}
				</Box>
			</CardContent>
		</Card>
	);
};

TrafficByDevice.propTypes = {
	className: PropTypes.string,
};

TrafficByDevice.defaultProps = {
	className: '',
};

export default TrafficByDevice;
