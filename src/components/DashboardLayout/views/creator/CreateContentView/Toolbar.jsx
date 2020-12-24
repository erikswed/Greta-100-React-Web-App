import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Container, Grid, Typography, Box, Button, Card, CardContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {},
	importButton: {
		marginRight: theme.spacing(1),
		boxShadow: theme.shadows[5],
	},
	exportButton: {
		marginRight: theme.spacing(1),
		boxShadow: theme.shadows[5],
	},
	newButton: {
		marginRight: theme.spacing(1),
		boxShadow: theme.shadows[5],
	},
	cardContent: {
		backgroundColor: theme.palette.primary.main,
	},
}));

const Toolbar = ({ className, ...rest }) => {
	const classes = useStyles();

	return (
		<div className={clsx(classes.root, className)} {...rest}>
			<Container maxWidth={false}>
				<Grid>
					<Card className={classes.cardContent}>
						<CardContent>
							<CardContent>
								<Typography gutterBottom variant="h4" component="h2" color="textSecondary">
									Create New Content
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									Here you can create new Greta's Week's content.
								</Typography>
							</CardContent>
							(This is an example showing how it can look like)
						</CardContent>
					</Card>
				</Grid>
				<Grid container spacing={24}>
					<Grid item lg={4}>
						<Box display="flex" justifyContent="flex-start">
							<CardContent>
								<Button color="primary" variant="contained" className={classes.importButton}>
									Import
								</Button>
								<Button color="primary" variant="contained" className={classes.exportButton}>
									Export
								</Button>
								<Button color="primary" variant="contained" className={classes.newButton}>
									New
								</Button>
							</CardContent>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

Toolbar.propTypes = {
	className: PropTypes.string,
};

Toolbar.defaultProps = {
	className: '',
};

export default Toolbar;
