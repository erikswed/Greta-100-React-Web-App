import React from 'react';
import { connect } from 'react-redux';
import Masonry from '../masonry/Masonry';
import ItemRenderer from '../masonry/ItemRenderer';

const la = require('lodash');

class TimeLineView extends React.Component {
	constructor() {
		super();
		this.photosArr = [];
		this.currentAlbum = 0;

		this.state = {
			gutter: 16,
			outerGutter: true,
			debug: true,
		};
	}

	render() {
		const { albumData } = this.props;
		if (albumData.length === 0) return null;
		const { albumIndex } = this.props;
		// don't render if album request does not exist in the map, albumIndex is not in the map or less then 0
		if (albumIndex < 1 || albumIndex == undefined) return null;
		let items = la.find(albumData, { weekNumber: String(albumIndex) });
		items = items.media;
		this.currentAlbum = albumIndex;
		const { width, gutter, outerGutter, debug } = this.state;

		return (
			<div>
				<div
					style={{
						position: 'absolute',
						zIndex: 2,
					}}
				>
					<label htmlFor="gutter">Gutter</label>
					<input
						id="gutter"
						type="number"
						step={1}
						min={0}
						max={32}
						value={gutter}
						onChange={e => {
							this.setState({
								gutter: parseInt(e.target.value, 10),
							});
						}}
					/>
					<button type="button" onClick={() => this.setState({ outerGutter: !outerGutter })}>
						Outer Gutter: {outerGutter ? 'On' : 'Off'}
					</button>
					<button type="button" onClick={() => this.setState({ debug: !debug })}>
						debug
					</button>
					<button type="button" onClick={() => this.setState({ width: 360 })}>
						360
					</button>
					<button type="button" onClick={() => this.setState({ width: 480 })}>
						480
					</button>
					<button type="button" onClick={() => this.setState({ width: 640 })}>
						640
					</button>
					<button type="button" onClick={() => this.setState({ width: 728 })}>
						728
					</button>
					<button type="button" onClick={() => this.setState({ width: 960 })}>
						960
					</button>
					<button type="button" onClick={() => this.setState({ width: '100%' })}>
						100%
					</button>
				</div>
				<div
					style={{
						width,
						height: 'auto',
						position: 'relative',
						margin: '0 auto',
					}}
				>
					<Masonry
						infinite
						items={items}
						itemRenderer={ItemRenderer}
						gutter={gutter}
						outerGutter={outerGutter}
						extraPx={0}
						debug={debug}
						rows={{
							0: 1,
							320: 2,
							480: 3,
							640: 4,
						}}
						cols={{
							0: 1,
							360: 2,
							640: 2,
							960: 3,
							1280: 4,
							1400: 5,
							1720: 6,
							2040: 7,
							2360: 8,
						}}
						onEnd={() => {
							// TODO possible when many items lazy load them
							// this.addItems();
						}}
					/>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return { albumData: state.rootReducer.remoteAlbumData };
};

const TimeLineViewer = connect(mapStateToProps, null)(TimeLineView);
export default TimeLineViewer;
