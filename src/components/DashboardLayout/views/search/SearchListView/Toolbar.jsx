import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
	Box,
	Grid,
	Card,
	Container,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
	makeStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.primary.light,
	},
	importButton: {
		marginRight: theme.spacing(1),
	},
	exportButton: {
		marginRight: theme.spacing(1),
	},
	cardContent: {
		backgroundColor: theme.palette.primary.main,
	},
	textField: {
		backgroundColor: theme.palette.primary.light,
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
									Searching
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									Here you can search for everything in Greta’s Week’s like search by date, title or event. The results
									are the same as the user’s see them on main Greta’s Week’s page. This service is only for admins or
									Creators Roles to easily check approved submissions .
								</Typography>
							</CardContent>
							(This is an example showing how it can look like)
						</CardContent>
					</Card>
				</Grid>
				<Grid container spacing={24}>
					<Grid item lg={5}>
						<Card className={classes.cardContent}>
							<CardContent>
								<Box maxWidth={500} className={classes.textField}>
									<TextField
										fullWidth
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<SvgIcon fontSize="small" color="action">
														<SearchIcon />
													</SvgIcon>
												</InputAdornment>
											),
										}}
										placeholder="Search Greta's Week's"
										variant="outlined"
									/>
								</Box>
							</CardContent>
						</Card>
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
