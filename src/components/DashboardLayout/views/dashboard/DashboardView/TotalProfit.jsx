import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Grid, Typography, makeStyles, colors, Box } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		backgroundColor: theme.palette.primary.main,
	},
	avatar: {
		backgroundColor: colors.indigo[600],
		height: 56,
		width: 56,
	},
	differenceIcon: {
		color: colors.green[900],
	},
	differenceValue: {
		color: colors.green[900],
		marginRight: theme.spacing(1),
	},
}));

const TotalProfit = ({ className, ...rest }) => {
	const classes = useStyles();

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardContent>
				<Grid container justify="space-between" spacing={3}>
					<Grid item>
						<Typography color="textSecondary" gutterBottom variant="h5">
							TOTAL LIKES
						</Typography>
						<Typography color="textPrimary" variant="h3">
							189.000
						</Typography>
					</Grid>
					<Grid item>
						<Avatar className={classes.avatar}>
							<AttachMoneyIcon />
						</Avatar>
					</Grid>
					<Box mt={2} display="flex" alignItems="center">
						<ArrowUpward className={classes.differenceIcon} />
						<Typography className={classes.differenceValue} variant="body2">
							30%
						</Typography>
						<Typography color="textSecondary" variant="caption">
							Since last month
						</Typography>
					</Box>
				</Grid>
			</CardContent>
		</Card>
	);
};

TotalProfit.propTypes = {
	className: PropTypes.string,
};

TotalProfit.defaultProps = {
	className: '',
};

export default TotalProfit;
