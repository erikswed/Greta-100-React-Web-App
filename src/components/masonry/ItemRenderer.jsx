/* eslint-disable no-return-assign */
import React from 'react';
import { Motion, spring } from 'react-motion';
import { DocxViewer, VideoViewer, XlsxViewer, PDFViewer, UnsupportedViewer, AudioViewer, TextViewer } from '../drivers';
import '../../styles/item-renderer.scss';
import OverlayXlsx from './OverLay-xlsx';
import OverlayPdf from './OverLay-pdf';
import OverlayDoc from './OverLay-doc';
import OverlayTxt from './OverLay-txt';
import OverlayMp3 from './OverLay-mp3';
import OverlayMp4 from './OverLay-mp4';

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
							fontFamily: 'sans-serif',
							backgroundImage: `url(${theFile})`,
							transform: `translate3d(0,0,0)`,
							opacity: s.scale,
							transformOrigin: '50% 50%',
						}}
					>
						<div
							style={{
								background: 'black',
								display: 'inline-block',
								fontSize: '.875rem',
								color: 'white',
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
		const { fileData, week, mediaType } = items;
		const filePath = encodeURI(`./images/weeks/${week}/${fileData}`);
		switch (mediaType) {
			case 'csv': {
				break;
			}
			case 'xlsx': {
				return (
					<div className="outer">
						<div className="pg-viewer-wrapper">
							<div className="pg-viewer" id="pg-viewer">
								<XlsxViewer responseType="arraybuffer" filePath={filePath} width={0} height={0} />
							</div>
						</div>
						<OverlayXlsx fileData={fileData} />
					</div>
				);
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
					<div className="outer">
						<div className="pg-viewer-wrapper">
							<div className="pg-viewer" id="pg-viewer">
								<PDFViewer fileType="pdf" filePath={filePath} width={0} height={0} />
							</div>
						</div>
						<OverlayPdf fileData={fileData} />
					</div>
				);
			}
			case 'docx': {
				return (
					<div className="outer">
						<div className="pg-viewer-wrapper">
							<div className="pg-viewer" id="pg-viewer">
								<DocxViewer fileType="docx" filePath={filePath} width={0} height={0} />
							</div>
						</div>
						<OverlayDoc fileData={fileData} />
					</div>
				);
			}
			case 'mp4': {
				return (
					<div className="outer">
						<div className="pg-viewer-wrapper-mp4">
							<div className="pg-viewer-mp4" id="pg-viewer-mp4">
								<VideoViewer fileType="pdf" filePath={filePath} width={0} height={0} />
							</div>
						</div>
						<OverlayMp4 fileData={fileData} />
					</div>
				);
			}
			case 'txt': {
				return (
					<div className="outer">
						<div className="pg-viewer-wrapper">
							<div className="pg-viewer" id="pg-viewer">
								<TextViewer fileType="txt" filePath={filePath} width={0} height={0} />
							</div>
						</div>
						<OverlayTxt fileData={fileData} />
					</div>
				);
			}
			case 'mp3': {
				return (
					<div className="outer">
						<div className="pg-viewer-wrapper-mp3">
							<div className="pg-viewer-mp3" id="pg-viewer-mp3">
								<AudioViewer fileType="mp3" filePath={filePath} width={0} height={0} />
							</div>
						</div>
						<OverlayMp3 fileData={fileData} />
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
