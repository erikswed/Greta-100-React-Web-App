// Copyright (c) 2017 PlanGrid, Inc.

import React from 'react';
import { PDFJS } from 'pdfjs-dist/build/pdf.combined';
import 'pdfjs-dist/web/compatibility';
import uniqueId from 'lodash/uniqueId';
import PDFPage from './pdf-page';

const INCREASE_PERCENTAGE = 0.2;
export default class PDFDriver extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pdf: null,
			zoom: 0,
			percent: 0,
		};

		this.increaseZoom = this.increaseZoom.bind(this);
		this.reduceZoom = this.reduceZoom.bind(this);
		this.resetZoom = this.resetZoom.bind(this);
	}

	componentDidMount() {
		const { filePath } = this.props;
		const containerWidth = this.container.offsetWidth;

		PDFJS.getDocument(filePath, null, null, this.progressCallback.bind(this)).then(pdf => {
			this.setState({ pdf, containerWidth });
		});
	}

	setZoom(zoom) {
		this.setState({
			zoom,
		});
	}

	progressCallback(progress) {
		const percent = ((progress.loaded / progress.total) * 100).toFixed();
		this.setState({ percent });
	}

	reduceZoom() {
		const { zoom } = this.state;
		if (zoom === 0) return;
		this.setZoom(zoom - 1);
	}

	increaseZoom() {
		const { zoom } = this.state;
		this.setZoom(zoom + 1);
	}

	resetZoom() {
		this.setZoom(0);
	}

	renderPages() {
		const { pdf, containerWidth, zoom } = this.state;
		const { disableVisibilityCheck } = this.props;
		if (!pdf) return null;
		const pages = Array.apply(null, { length: pdf.numPages });
		return pages.map((v, i) => (
			<PDFPage
				index={i + 1}
				key={`pdfPage_${uniqueId()}`}
				pdf={pdf}
				containerWidth={containerWidth}
				zoom={zoom * INCREASE_PERCENTAGE}
				disableVisibilityCheck={disableVisibilityCheck}
			/>
		));
	}

	renderLoading() {
		const { pdf, percent } = this.state;
		if (pdf) return null;
		return <div className="pdf-loading">LOADING ({percent}%)</div>;
	}

	render() {
		return (
			<div className="pdf-viewer-container">
				<div className="pdf-viewer" ref={node => (this.container = node)}>
					<div className="pdf-controlls-container">
						<button type="button" className="view-control" onClick={this.increaseZoom}>
							<i className="zoom-in" />
						</button>
						<button type="button" className="view-control" onClick={this.resetZoom}>
							<i className="zoom-reset" />
						</button>
						<button type="button" className="view-control" onClick={this.reduceZoom}>
							<i className="zoom-out" />
						</button>
					</div>
					{this.renderLoading()}
					{this.renderPages()}
				</div>
			</div>
		);
	}
}

PDFDriver.defaultProps = {
	disableVisibilityCheck: false,
};
