import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { compose } from 'recompose';
import Page from '../../../utils/Page';
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

const SearchListViewBase = () => {
	const classes = useStyles();
	// const [customers] = useState(data);

	return (
		<MotionDiv>
			<Page className={classes.root} title="Search">
				<Container maxWidth={false}>
					<Toolbar />
					{/* <Box mt={3}>
						<Results customers={customers} />
					</Box> */}
				</Container>
			</Page>
		</MotionDiv>
	);
};

const SearchListView = () => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div>
				<SearchListViewBase authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.USER);
const enhance = compose(withEmailVerification, withAuthorization(condition));

export default enhance(SearchListView);
