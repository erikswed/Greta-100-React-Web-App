import React from 'react';
import LaneLayout from '../masonry/LaneLayout';
import ItemGenerator from '../masonry/ItemGenerator';
import ItemRenderer from '../masonry/ItemRenderer';
import Text from '../masonry/Text';

class ApiDemo extends React.Component {
	constructor() {
		super();

		this.state = {
			items: ItemGenerator(50),
			autoScroll: 0,
			horizontal: false,
			gutter: 16,
			outerGutter: true,
			debug: false,
		};

		this.moreItems = this.moreItems.bind(this);
	}

	moreItems() {
		this.setState({
			items: [...this.state.items, ...ItemGenerator(50)],
		});
	}

	render() {
		const { items, gutter, debug, outerGutter, autoScroll, horizontal } = this.state;

		const labelSize = 2;

		return (
			<div>
				<div>
					<Text fontSize={labelSize} mb={2} block is="label" htmlFor="direction">
						Direction
					</Text>
					<select
						id="direction"
						value={horizontal}
						onChange={e => this.setState({ horizontal: e.target.value === 'true' })}
					>
						<option value={false}>Vertical</option>
						<option value>Horizontal</option>
					</select>
					<Text fontSize={labelSize} mb={2} block is="label" htmlFor="autoscroll">
						Auto Scroll
					</Text>
					<input
						id="autoscroll"
						value={autoScroll}
						type="range"
						min="0"
						max="5"
						step="1"
						onChange={e =>
							this.setState({
								autoScroll: e.target.value,
							})
						}
					/>

					<Text fontSize={labelSize} mb={2} block is="label" htmlFor="gutter">
						Gutter
					</Text>
					<input
						id="gutter"
						value={gutter}
						type="range"
						min="0"
						max="32"
						onChange={e =>
							this.setState({
								gutter: e.target.value,
							})
						}
					/>

					<Text fontSize={labelSize} mb={2} block is="label" htmlFor="outergutter">
						Outer Gutter
					</Text>
					<input
						id="outergutter"
						checked={outerGutter}
						type="checkbox"
						onChange={e => {
							this.setState({ outerGutter: e.target.checked });
						}}
					/>

					<Text fontSize={labelSize} mb={2} block is="label" htmlFor="debug">
						Debug
					</Text>
					<input
						id="debug"
						checked={debug}
						type="checkbox"
						onChange={e => {
							this.setState({ debug: e.target.checked });
						}}
					/>
				</div>
				<div>
					<LaneLayout
						items={items}
						horizontal={horizontal}
						gutter={parseInt(gutter, 10)}
						outerGutter={outerGutter}
						onEnd={() => this.moreItems()}
						itemRenderer={ItemRenderer}
						autoScroll={parseInt(autoScroll, 10)}
						debug={debug}
						lanes={{
							vertical: {
								0: 1,
								480: 2,
								720: 3,
								960: 4,
								1200: 5,
							},
							horizontal: {
								0: 1,
								400: 2,
								600: 3,
								800: 4,
								1000: 5,
							},
						}}
					/>
				</div>
			</div>
		);
	}
}

export default ApiDemo;
