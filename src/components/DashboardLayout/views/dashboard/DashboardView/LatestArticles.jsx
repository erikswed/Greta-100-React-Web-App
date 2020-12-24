import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
	Box,
	Button,
	Card,
	CardHeader,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	makeStyles,
	Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const data = [
	{
		id: uuid(),
		name: 'Greta Thunberg: TIMEs Person of the Year 2019 | Time',
		imageUrl: require('../../../../../assets/time-magazine.png'),
		updatedAt: moment().subtract(2, 'hours'),
	},
	{
		id: uuid(),
		name: 'Greta Thunberg win 2021 the Nobel Prize',
		imageUrl: require('../../../../../assets/nobel.png'),
		updatedAt: moment().subtract(2, 'hours'),
	},
	{
		id: uuid(),
		name: 'Greta Thunberg: TIMEs Person of the Year 2019 | Time',
		imageUrl: require('../../../../../assets/time-magazine.png'),
		updatedAt: moment().subtract(3, 'hours'),
	},
	{
		id: uuid(),
		name: 'Greta Thunberg win 2021 the Nobel Prize',
		imageUrl: require('../../../../../assets/nobel.png'),
		updatedAt: moment().subtract(5, 'hours'),
	},
	{
		id: uuid(),
		name: 'GitHub',
		imageUrl: require('../../../../../assets/time-magazine.png'),
		updatedAt: moment().subtract(9, 'hours'),
	},
];

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		backgroundColor: theme.palette.primary.main,
	},
	image: {
		height: 48,
		width: 48,
	},
}));

const LatestArticles = ({ className, ...rest }) => {
	const classes = useStyles();
	const [products] = useState(data);

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardHeader
				subtitle={`${products.length} in total`}
				title={
					<Typography gutterBottom variant="h5" color="textSecondary">
						LATEST ARTICLES
					</Typography>
				}
				subheader="(This is an example showing how it can look like)"
			/>
			<Divider />
			<List>
				{products.map((product, i) => (
					<ListItem divider={i < products.length - 1} key={product.id}>
						<ListItemAvatar>
							<img alt="Product" className={classes.image} src={product.imageUrl} />
						</ListItemAvatar>
						<ListItemText primary={product.name} secondary={`Updated ${product.updatedAt.fromNow()}`} />
						<IconButton edge="end" size="small">
							<MoreVertIcon />
						</IconButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<Box display="flex" justifyContent="flex-end" p={2}>
				<Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text">
					View all
				</Button>
			</Box>
		</Card>
	);
};

LatestArticles.propTypes = {
	className: PropTypes.string,
};

LatestArticles.defaultProps = {
	className: '',
};

export default LatestArticles;
