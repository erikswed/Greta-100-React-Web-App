import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { useRoutes } from 'react-router-dom';
import { ThemeContextProvider } from './theme/ThemeProvider';
import { getAlbumData } from './redux/albumData/albumData.actions';
import { getMetaData } from './redux/albumMetaData/albumMetaData.actions';
import { withAuthentication } from './session';
import './styles/index.css';
import routes from './routes';

const AnimatedSwitch = () => {
	const routing = useRoutes(routes);

	return (
		<AnimatePresence exitBeforeEnter initial={false}>
			<div>{routing}</div>
		</AnimatePresence>
	);
};

const App = props => {
	const { getMeta, getAlbum } = props;

	useEffect(() => {
		getMeta();
		getAlbum();
	}, [getMeta, getAlbum]);

	return <ThemeContextProvider> {AnimatedSwitch()} </ThemeContextProvider>;
};
const mapDispatchToProps = dispatch => ({
	getMeta: () => dispatch(getMetaData()),
	getAlbum: () => dispatch(getAlbumData()),
});

export default compose(connect(null, mapDispatchToProps), withAuthentication)(App);
