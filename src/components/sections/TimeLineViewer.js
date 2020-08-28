import React from 'react';
import Masonry from '../masonry/Masonry';
import VerticalMasonry from '../masonry/VerticalMasonry';
import ItemRenderer from '../masonry/ItemRenderer';
import albums from '../../albumData.json';

const la = require('lodash');

class TimeLineViewer extends React.Component {
	constructor(props) {
		super(props);
		this.photosArr = [];
		this.currentAlbum = 0;

		this.state = {
			gutter: 16,
			outerGutter: true,
			debug: true,
			vertical: true,
		};
	}

	render() {
		// console.log(JSON.stringify(albums));
		const { albumIndex } = this.props;
		// Dont render if album request does not exist in the map, albumIndex is not in the map or less then 0
		if (albumIndex < 1 || albumIndex == undefined) return null;
		let items = la.find(albums, { weekNumber: String(albumIndex) });
		items = items.media;
		this.currentAlbum = albumIndex;
		const { width, gutter, outerGutter, debug, vertical, fullscreen } = this.state;
		const LeComponent = vertical ? Masonry : VerticalMasonry;

		return (
			<div>
				<div
					style={{
						position: fullscreen && 'absolute',
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
					<button type="button" onClick={() => this.setState({ vertical: !vertical })}>
						{vertical ? 'Vertical' : 'Horizontal'}
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
					<button type="button" onClick={() => this.setState({ fullscreen: !fullscreen })}>
						{fullscreen ? 'Fullscreen off' : 'Fullscreen on'}
					</button>
				</div>
				<div
					style={{
						width,
						height: !fullscreen && 600,
						position: fullscreen ? 'initial' : 'relative',
						margin: '0 auto',
					}}
				>
					<LeComponent
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
							// this.addItems();
						}}
					/>
					{/* <style>
{`body {
background-color:  white;
}`}
</style> */}
				</div>
			</div>
		);
	}
}
export default TimeLineViewer;
