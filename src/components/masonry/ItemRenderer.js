import React from 'react';
import { Motion, spring } from 'react-motion';

// eslint-disable-next-line react/prefer-stateless-function
class ItemRenderer extends React.Component {
	render() {
		const { aaa } = this.props;
		const { ratio, background, fileData, id, week } = aaa;

		const photo = encodeURIComponent(`./images/weeks/${week}/${fileData}`);

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
							backgroundImage: `url(${photo})`,
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
}

export default ItemRenderer;
