import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { PDFJS } from 'pdfjs-dist/build/pdf.combined';
import 'pdfjs-dist/web/compatibility';

PDFJS.disableWorker = true;
const DEFAULT_SCALE = 1.1;

export default class PDFPage extends React.Component {
	constructor() {
		super();
		this.state = {};
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		const { disableVisibilityCheck } = this.props;
		if (disableVisibilityCheck) this.fetchAndRenderPage();
	}

	componentDidUpdate(prevProps, prevState) {
		const { disableVisibilityCheck, zoom } = this.props;
		if (disableVisibilityCheck) {
			if (prevProps.zoom !== zoom) this.fetchAndRenderPage();
			return;
		}

		// we want to render/re-render in two scenarias
		// user scrolls to the pdf
		// user zooms in
		const { isVisible } = this.state;
		if (prevState.isVisible === isVisible && prevProps.zoom === zoom) return;
		if (isVisible) this.fetchAndRenderPage();
	}

	onChange(isVisible) {
		if (isVisible) this.setState({ isVisible });
	}

	fetchAndRenderPage() {
		const { pdf, index } = this.props;
		pdf.getPage(index).then(this.renderPage.bind(this));
	}

	renderPage(page) {
		const { containerWidth, zoom } = this.props;
		const calculatedScale = containerWidth / page.getViewport(DEFAULT_SCALE).width;
		const scale = calculatedScale > DEFAULT_SCALE ? DEFAULT_SCALE : calculatedScale;
		const viewport = page.getViewport(scale + zoom);
		const { width, height } = viewport;

		const context = this.canvas.getContext('2d');
		this.canvas.width = width;
		this.canvas.height = height;

		page.render({
			canvasContext: context,
			viewport,
		});
	}

	render() {
		const { index, disableVisibilityCheck } = this.props;
		return (
			<div key={`page-${index}`} className="pdf-canvas">
				{disableVisibilityCheck ? (
					<canvas
						ref={node => {
							this.canvas = node;
						}}
						width="670"
						height="870"
					/>
				) : (
					<VisibilitySensor onChange={this.onChange} partialVisibility>
						<canvas
							ref={node => {
								this.canvas = node;
							}}
							width="670"
							height="870"
						/>
					</VisibilitySensor>
				)}
			</div>
		);
	}
}
