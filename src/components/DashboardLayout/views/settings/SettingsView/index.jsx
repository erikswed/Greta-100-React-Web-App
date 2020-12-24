import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { compose } from 'recompose';
import Page from '../../../utils/Page';
import Notifications from './Notifications';
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

const SettingsViewBase = () => {
	const classes = useStyles();

	return (
		<MotionDiv>
			<Page className={classes.root} title="Settings">
				<Container maxWidth="lg">
					<Notifications />
				</Container>
			</Page>
		</MotionDiv>
	);
};

const SettingsView = () => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div>
				<SettingsViewBase authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.USER);
const enhance = compose(withEmailVerification, withAuthorization(condition));

export default enhance(SettingsView);
