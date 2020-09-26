// Copyright (c) 2017 PlanGrid, Inc.

import React, { Component } from 'react';

import '../../styles/photo-viewer.scss';

export default class PhotoViewer extends Component {
	componentDidMount() {
		const { originalWidth, originalHeight, texture } = this.props;
		const imageDimensions = this.getImageDimensions.call(this, originalWidth, originalHeight);
		texture.image.style.width = `${imageDimensions.width}px`;
		texture.image.style.height = `${imageDimensions.height}px`;
		texture.image.setAttribute('class', 'photo');
		document.getElementById('pg-photo-container').appendChild(texture.image);
	}

	getImageDimensions(originalWidth, originalHeight) {
		// Scale image to fit into viewer
		let imgHeight;
		let imgWidth;
		const { height: viewerHeight, width: viewerWidth } = this.props;

		if (originalHeight <= viewerHeight && originalWidth <= viewerWidth) {
			imgWidth = originalWidth;
			imgHeight = originalHeight;
		} else {
			const heightRatio = viewerHeight / originalHeight;
			const widthRatio = viewerWidth / originalWidth;
			if (heightRatio < widthRatio) {
				imgHeight = originalHeight * heightRatio;
				imgWidth = originalWidth * heightRatio;
			} else {
				imgHeight = originalHeight * widthRatio;
				imgWidth = originalWidth * widthRatio;
			}
		}

		return { height: imgHeight, width: imgWidth };
	}

	render() {
		const { width, height } = this.props;
		const containerStyles = {
			width: `${width}px`,
			height: `${height}px`,
		};

		return <div style={containerStyles} className="photo-viewer-container" id="pg-photo-container" />;
	}
}
