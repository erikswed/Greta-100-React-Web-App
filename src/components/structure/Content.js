import React, { Component } from 'react';
import AboutMe from '../sections/AboutMe';
import TimeLine from '../sections/TimeLine';
import TimeLineViewer from '../sections/TimeLineViewer';
import Articles from '../sections/Articles';

class Content extends Component {
	constructor(props) {
		super(props);
		this.onChangeAlbum = this.onChangeAlbum.bind(this);
		this.state = {
			currentAlbumIndex: 1,
		};
	}

	onChangeAlbum(index) {
		this.setState({
			currentAlbumIndex: index,
		});
	}

	render() {
		const { currentAlbumIndex } = this.state;
		return (
			<main>
				<AboutMe />
				<TimeLine onChangeAlbum={this.onChangeAlbum} />
				{/* <ApiDemo albumIndex={currentAlbumIndex} /> */}
				<TimeLineViewer albumIndex={currentAlbumIndex} />
				<Articles />
			</main>
		);
	}
}

export default Content;
