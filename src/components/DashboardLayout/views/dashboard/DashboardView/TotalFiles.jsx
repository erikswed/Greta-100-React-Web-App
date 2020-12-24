import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Grid, Typography, colors, makeStyles } from '@material-ui/core';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		backgroundColor: theme.palette.primary.main,
	},
	avatar: {
		backgroundColor: colors.red[600],
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

const TotalFiles = ({ className, ...rest }) => {
	const classes = useStyles();

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardContent>
				<Grid container justify="space-between" spacing={3}>
					<Grid item>
						<Typography color="textSecondary" gutterBottom variant="h5">
							TOTAL FILES
						</Typography>
						<Typography color="textPrimary" variant="h3">
							100.240
						</Typography>
					</Grid>
					<Grid item>
						<Avatar className={classes.avatar}>
							<ListIcon />
						</Avatar>
					</Grid>
				</Grid>
				<Box mt={2} display="flex" alignItems="center">
					<ArrowUpward className={classes.differenceIcon} />
					<Typography className={classes.differenceValue} variant="body2">
						12%
					</Typography>
					<Typography color="textSecondary" variant="caption">
						Since last month
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

TotalFiles.propTypes = {
	className: PropTypes.string,
};

TotalFiles.defaultProps = {
	className: '',
};

export default TotalFiles;
