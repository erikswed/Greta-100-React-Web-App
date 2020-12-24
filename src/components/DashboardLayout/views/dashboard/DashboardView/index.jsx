import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { compose } from 'recompose';
import Page from '../../../utils/Page';
import Budget from './TotalFiles';
import LatestOrders from './LatestSubmissions';
import LatestProducts from './LatestArticles';
import Sales from './LatestViewed';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';
import MotionDiv from '../../../utils/MotionDiv';
import * as ROLES from '../../../../../constants/roles';
import { withEmailVerification, withAuthorization, AuthUserContext } from '../../../../../session';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.primary.light,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

const DashboardBase = authUser => {
	const classes = useStyles();

	return (
		<MotionDiv>
			<Page className={classes.root} title="Dashboard">
				<Container maxWidth={false}>
					<Grid container spacing={3}>
						<Grid item lg={3} sm={6} xl={3} xs={12}>
							<Budget />
						</Grid>
						<Grid item lg={3} sm={6} xl={3} xs={12}>
							<TotalCustomers />
						</Grid>
						<Grid item lg={3} sm={6} xl={3} xs={12}>
							<TasksProgress />
						</Grid>
						<Grid item lg={3} sm={6} xl={3} xs={12}>
							<TotalProfit />
						</Grid>
						<Grid item lg={8} md={12} xl={9} xs={12}>
							<LatestOrders />
						</Grid>
						<Grid item lg={4} md={6} xl={3} xs={12}>
							<TrafficByDevice />
						</Grid>
						<Grid item lg={4} md={6} xl={3} xs={12}>
							<LatestProducts />
						</Grid>
						<Grid item lg={8} md={12} xl={9} xs={12}>
							<Sales />
						</Grid>
					</Grid>
				</Container>
			</Page>
		</MotionDiv>
	);
};

const Dashboard = () => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div>
				<DashboardBase authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.USER);
const enhance = compose(withEmailVerification, withAuthorization(condition));

export default enhance(Dashboard);
