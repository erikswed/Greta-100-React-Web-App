// Copyright (c) 2017 PlanGrid, Inc.

import React, { Component } from 'react';
import '../../styles/video.scss';
import Loading from '../file-viewer/loading';

class AudioViewer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	onCanPlay() {
		this.setState({ loading: false });
	}

	renderLoading() {
		const { loading } = this.state;
		if (loading) {
			return <Loading />;
		}
		return null;
	}

	render() {
		const { loading } = this.state;
		const visibility = loading ? 'hidden' : 'visible';
		const { filePath } = this.props;
		return (
			<div className="pg-driver-view">
				<div className="video-container">
					{this.renderLoading()}
					<audio style={{ visibility }} controls onCanPlay={e => this.onCanPlay(e)} src={filePath}>
						<track kind="captions" />
						Video playback is not supported by your browser.
					</audio>
				</div>
			</div>
		);
	}
}

export default AudioViewer;
