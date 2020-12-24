import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import { compose } from 'recompose';
import Page from '../../../utils/Page';
import LatestSubmissions from './LatestSubmissions';
import Toolbar from './Toolbar';
import MotionDiv from '../../../utils/MotionDiv';
import * as ROLES from '../../../../../constants/roles';
import { withEmailVerification, withAuthorization, AuthUserContext } from '../../../../../session';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.primary.light,
		minHeight: '100vh',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

const SubmissionsViewBase = () => {
	const classes = useStyles();

	return (
		<MotionDiv>
			<Page className={classes.root} title="Submissions">
				<Container maxWidth={false}>
					<Toolbar />
					<Box mt={3}>
						<LatestSubmissions />
					</Box>
				</Container>
			</Page>
		</MotionDiv>
	);
};

const SubmissionsView = () => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div>
				<SubmissionsViewBase authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);
const enhance = compose(withEmailVerification, withAuthorization(condition));

export default enhance(SubmissionsView);
