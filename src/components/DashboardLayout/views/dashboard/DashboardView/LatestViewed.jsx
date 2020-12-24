import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Typography, Box, Button, Card, CardContent, CardHeader, Divider, makeStyles } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(theme => ({
	root: { backgroundColor: theme.palette.primary.main },
}));

const LatestViewed = ({ className, ...rest }) => {
	const classes = useStyles();

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardHeader
				action={
					<Button endIcon={<ArrowDropDownIcon />} size="small" variant="text">
						Last 7 days
					</Button>
				}
				title={
					<Typography gutterBottom variant="h5" color="textSecondary">
						LATEST VIEWED IMAGES
					</Typography>
				}
				subheader="(This is an example showing how it can look like)"
			/>
			<Divider />
			<CardContent>
				<Box height={400} position="relative">
					<div>{null}</div>
				</Box>
			</CardContent>
			<Divider />
			<Box display="flex" justifyContent="flex-end" p={2}>
				<Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text">
					Overview
				</Button>
			</Box>
		</Card>
	);
};

LatestViewed.propTypes = {
	className: PropTypes.string,
};

LatestViewed.defaultProps = {
	className: '',
};

export default LatestViewed;
