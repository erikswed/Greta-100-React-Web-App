import React from 'react';
import { Motion, spring } from 'react-motion';
import FileViewer from '../file-viewer/file-viewer';
import {
	CsvViewer,
	DocxViewer,
	VideoViewer,
	XlsxViewer,
	XBimViewer,
	PDFViewer,
	UnsupportedViewer,
	PhotoViewerWrapper,
	AudioViewer,
} from '../drivers';

// eslint-disable-next-line react/prefer-stateless-function
class ItemRenderer extends React.Component {
	driveForImage() {
		const { items } = this.props;
		const { ratio, background, fileData, id, week } = items;
		const theFile = encodeURI(`./images/weeks/${week}/${fileData}`);

		return (
			<Motion defaultStyle={{ scale: 0 }} style={{ scale: spring(1) }}>
				{s => (
					<div
						style={{
							width: '100%',
							height: 0,
							paddingBottom: `${100 * ratio}%`,
							backgroundSize: '100% 100%',
							backgroundColor: background,
							color: 'white',
							fontFamily: 'sans-serif',
							backgroundImage: `url(${theFile})`,
							transform: `translate3d(0,0,0)`,
							opacity: s.scale,
							transformOrigin: '50% 50%',
						}}
					>
						<div
							style={{
								padding: 8,
								background: 'black',
								display: 'inline-block',
								fontSize: '.875rem',
							}}
						>
							#{id}
						</div>
					</div>
				)}
			</Motion>
		);
	}

	render() {
		const { items } = this.props;
		const { mediaType } = items;
		const { fileData, week } = items;
		const theFile = encodeURI(`./images/weeks/${week}/${fileData}`);
		switch (mediaType) {
			case 'csv': {
				break;
			}
			case 'xlsx': {
				break;
			}
			case 'jpg': {
				return this.driveForImage();
			}
			case 'jpeg': {
				return this.driveForImage();
			}
			case 'gif': {
				return this.driveForImage();
			}
			case 'bmp': {
				return this.driveForImage();
			}
			case 'png': {
				return this.driveForImage();
			}
			case 'pdf': {
				return (
					<div className="pg-viewer-wrapper">
						<div className="pg-viewer" id="pg-viewer">
							<PDFViewer fileType="pdf" filePath={theFile} />
						</div>
					</div>
				);
			}
			case 'docx': {
				return (
					<div className="pg-viewer-wrapper">
						<div className="pg-viewer" id="pg-viewer">
							<DocxViewer fileType="docx" filePath={theFile} />
						</div>
					</div>
				);
			}
			case 'mp4': {
				return (
					<div className="pg-viewer-wrapper">
						<div className="pg-viewer" id="pg-viewer">
							<VideoViewer fileType="pdf" filePath={theFile} />
						</div>
					</div>
				);
			}
			default: {
				return UnsupportedViewer;
			}
		}
		return null;
	}
}

export default ItemRenderer;
