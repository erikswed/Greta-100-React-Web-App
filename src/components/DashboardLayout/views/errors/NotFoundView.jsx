import React from 'react';
import { Box, Container, Typography, makeStyles } from '@material-ui/core';
import Page from '../../utils/Page';
import MotionDiv from '../../utils/MotionDiv';
import mPage from '../../../../assets/undraw_page_not_found_su7k.svg';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100vh',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
	image: {
		marginTop: 50,
		display: 'inline-block',
		maxWidth: '100%',
		width: 560,
	},
}));

const NotFoundView = () => {
	const classes = useStyles();

	return (
		<MotionDiv>
			<Page className={classes.root} title="404">
				<Box display="flex" flexDirection="column" height="100%" justifyContent="center">
					<Container maxWidth="md">
						<Typography align="center" color="textPrimary" variant="h1">
							404: The page you are looking for isn’t here
						</Typography>
						<Typography align="center" color="textPrimary" variant="subtitle2">
							You either used some shady route or you came here by mistake. Whichever it is, try using the navigation
						</Typography>
						<Box textAlign="center">
							<img alt="Under development" className={classes.image} src={mPage} />
						</Box>
					</Container>
				</Box>
			</Page>
		</MotionDiv>
	);
};

export default NotFoundView;
