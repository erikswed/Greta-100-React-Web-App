/* eslint-disable no-return-assign */
import React from 'react';
import { Motion, spring } from 'react-motion';
import { DocxViewer, VideoViewer, XlsxViewer, PDFViewer, UnsupportedViewer, AudioViewer, TextViewer } from '../drivers';
import '../../styles/item-renderer.scss';

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
		const { fileData, week, mediaType } = items;
		const filePath = encodeURI(`./images/weeks/${week}/${fileData}`);
		switch (mediaType) {
			case 'csv': {
				break;
			}
			case 'xlsx': {
				return (
					<div className="pg-viewer-wrapper">
						<div className="pg-viewer" id="pg-viewer">
							<XlsxViewer responseType="arraybuffer" filePath={filePath} width={0} height={0} />
						</div>
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
					<div className="pg-viewer-wrapper">
						<div className="pg-viewer" id="pg-viewer">
							<PDFViewer fileType="pdf" filePath={filePath} width={0} height={0} />
						</div>
					</div>
				);
			}
			case 'docx': {
				return (
					<div className="pg-viewer-wrapper">
						<div className="pg-viewer" id="pg-viewer">
							<DocxViewer fileType="docx" filePath={filePath} width={0} height={0} />
						</div>
					</div>
				);
			}
			case 'mp4': {
				// const Section = styled.section(
				// 	`display: flex;
				// 	justify-content: center;
				// 	align-items: center;
				// 	flex-wrap: wrap;`,
				// );
				// const Text = styled.div({
				// 	position: 'absolute',
				// 	left: '50%',
				// 	top: '50%',
				// 	transform: 'translate(-50%, -50%)',
				// 	color: 'white',
				// 	fontWeight: 'bold',
				// 	fontSize: 32,
				// });
				return (
					<div>
						<div className="pg-viewer-wrapper">
							<div className="pg-viewer" id="pg-viewer">
								<VideoViewer fileType="pdf" filePath={filePath} width={0} height={0} />
							</div>
						</div>
						<div
							style={{
								position: 'absolute',
								left: '50%',
								top: '50%',
								transform: 'translate(-50%, -50%)',
								color: 'white',
								fontWeight: 'bold',
								fontSize: 32,
							}}
						>
							SOME TEXT
						</div>
					</div>
				);
			}
			case 'txt': {
				return (
					<div className="pg-viewer-wrapper">
						<div className="pg-viewer" id="pg-viewer">
							<TextViewer fileType="txt" filePath={filePath} width={0} height={0} />
						</div>
					</div>
				);
			}
			case 'mp3': {
				return (
					<div className="pg-viewer-wrapper">
						<div className="pg-viewer" id="pg-viewer">
							<AudioViewer fileType="mp3" filePath={filePath} width={0} height={0} />
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
