// Copyright (c) 2017 PlanGrid, Inc.

import React, { Component } from 'react';

import * as THREE from 'three';
import PhotoViewer from './photo-viewer';
import Photo360Viewer from './photo360-viewer';
import Loading from '../file-viewer/loading';

function getPhotoDriver(width, height, fileType) {
	if (fileType === 'jpg' && window.Math.abs(width / height - 2) <= 0.01) {
		return Photo360Viewer;
	}
	return PhotoViewer;
}

export default class PhotoViewerWrapper extends Component {
	constructor(props) {
		super(props);

		this.state = {
			originalWidth: 0,
			originalHeight: 0,
			imageLoaded: false,
		};
	}

	componentDidMount() {
		// spike on using promises and a different loader or adding three js loading manager
		const loader = new THREE.TextureLoader();
		const { filePath } = this.props;
		loader.crossOrigin = '';
		// load a resource
		loader.load(
			// resource URL
			filePath,
			// Function when resource is   loaded
			texture => {
				this.setState({
					originalWidth: texture.image.width,
					originalHeight: texture.image.height,
					imageLoaded: true,
					texture,
				});
			},
			xhr => {
				console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
			},
			xhr => {
				console.log('An error happened', xhr);
			},
		);
	}

	render() {
		const { originalWidth, originalHeight, imageLoaded } = this.state;
		const { fileType } = this.prop;
		if (!imageLoaded) {
			return <Loading />;
		}
		const PhotoDriver = getPhotoDriver(originalWidth, originalHeight, fileType);

		return <PhotoDriver {...this.state} {...this.props} />;
	}
}
