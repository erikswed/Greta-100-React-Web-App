// Copyright (c) 2017 PlanGrid, Inc.

import React, { Component } from 'react';

import '../../styles/video.scss';
import Loading from '../file-viewer/loading';

class VideoViewer extends Component {
	constructor() {
		super();
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
		const { fileType, filePath } = this.props;
		const visibility = loading ? 'hidden' : 'visible';
		return (
			<div className="pg-driver-view">
				<div className="video-container">
					{this.renderLoading()}
					<video
						style={{ visibility }}
						controls
						type={`video/${fileType}`}
						onCanPlay={e => this.onCanPlay(e)}
						src={filePath}
					>
						Video playback is not supported by your browser.
					</video>
				</div>
			</div>
		);
	}
}

export default VideoViewer;
