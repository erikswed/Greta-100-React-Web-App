import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { compose } from 'recompose';
import Page from '../../../utils/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import MotionDiv from '../../../utils/MotionDiv';
import * as ROLES from '../../../../../constants/roles';
import { withAuthorization, AuthUserContext, withEmailVerification } from '../../../../../session';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.primary.light,
		minHeight: '100vh',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

const AccountBase = () => {
	const classes = useStyles();

	return (
		<MotionDiv>
			<Page className={classes.root} title="Account">
				<Container maxWidth="lg">
					<Grid container spacing={3}>
						<Grid item lg={4} md={6} xs={12}>
							<Profile />
						</Grid>
						<Grid item lg={8} md={6} xs={12}>
							<ProfileDetails />
						</Grid>
					</Grid>
				</Container>
			</Page>
		</MotionDiv>
	);
};

const Account = () => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div>
				<AccountBase authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.USER);
const enhance = compose(withEmailVerification, withAuthorization(condition));

export default enhance(Account);
