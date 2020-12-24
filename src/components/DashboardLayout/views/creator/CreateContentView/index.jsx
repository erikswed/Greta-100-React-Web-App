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
	productCard: {
		height: '100%',
	},
}));

const CreateContentViewBase = () => {
	const classes = useStyles();
	// const [products] = useState(data);

	return (
		<MotionDiv>
			<Page className={classes.root} title="Create">
				<Container maxWidth={false}>
					<Toolbar />
					{/* <Box mt={3}>
						<Grid container spacing={3}>
							{products.map(product => (
								<Grid item key={product.id} lg={4} md={6} xs={12}>
									<ProductCard className={classes.productCard} product={product} />
								</Grid>
							))}
						</Grid>
					</Box>
					<Box mt={3} display="flex" justifyContent="center">
						<Pagination color="primary" count={3} size="small" />
					</Box> */}
				</Container>
			</Page>
		</MotionDiv>
	);
};

const CreateContentView = () => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div>
				<CreateContentViewBase authUser={authUser} />
			</div>
		)}
	</AuthUserContext.Consumer>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.USER);
const enhance = compose(withEmailVerification, withAuthorization(condition));
export default enhance(CreateContentView);
