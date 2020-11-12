import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getAlbumData } from './redux/albumData/albumData.actions';
import { getMetaData } from './redux/albumMetaData/albumMetaData.actions';

import Header from './components/structure/Header';
import Content from './components/structure/Content';
import Footer from './components/structure/Footer';
import { withAuthentication } from './session';
import './styles/index.css';

class App extends Component {
	componentDidMount() {
		const { getMeta, getAlbum } = this.props;
		getMeta();
		getAlbum();
	}

	render() {
		return (
			<div>
				<Header />
				<Content />
				<Footer />
			</div>
		);
	}
}
const mapDispatchToProps = dispatch => ({
	getMeta: () => dispatch(getMetaData()),
	getAlbum: () => dispatch(getAlbumData()),
});

export default compose(connect(null, mapDispatchToProps), withAuthentication)(App);
