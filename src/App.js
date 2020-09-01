import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData, getAlbumData } from './actions/index';
import Header from './components/structure/Header';
import Content from './components/structure/Content';
import Footer from './components/structure/Footer';

class App extends Component {
	componentDidMount() {
		document.title = [
			'Resume.basics.name',
			'Resume.basics.label',
			['Resume.basics.location.region', 'Resume.basics.location.country'].join(', '),
		].join(' | ');
		const { getDataPosts, getAlbum } = this.props;
		getDataPosts();
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
	getDataPosts: () => dispatch(getData()),
	getAlbum: () => dispatch(getAlbumData()),
});

export default connect(null, mapDispatchToProps)(App);
