/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { withResizeDetector } from 'react-resize-detector';
import VisibilitySensor from 'react-visibility-sensor';
import { max, map, compact, last } from 'lodash';

class Masonry extends React.Component {
	constructor() {
		super();
		this.container = React.createRef();
		this.list = React.createRef();
		this.state = {
			mounted: false,
			scrollTop: 0,
			scrollProgress: 0,
		};

		this._onEnd = this._onEnd.bind(this);
		this._isVisibleItem = this._isVisibleItem.bind(this);
		this._setContainerHeight = this._setContainerHeight.bind(this);
		this._onResize = this._onResize.bind(this);
		this._onScroll = this._onScroll.bind(this);
	}

	componentDidMount() {
		this.setState({
			mounted: true,
		});
		this.container.current.addEventListener('scroll', this._onScroll, false);
	}

	UNSAFE_componentWillReceiveProps({ width }) {
		const { width: width2 } = this.props;
		if (width2 !== width) {
			setTimeout(this._onResize, 0);
		}
	}

	componentWillUnmount() {
		this.container.current.removeEventListener('scroll', this._onScroll, false);
	}

	/**
	 * Do something when the container is scrolled
	 */
	_onScroll() {
		const { scrollTop, scrollHeight } = this.container.current;

		this.setState({
			scrollTop,
			scrollProgress: (1 / scrollHeight) * scrollTop,
		});
	}

	/**
	 * Approximate previous scroll-position after container was resized
	 */
	_onResize() {
		const { scrollProgress } = this.state;
		const container = this.container.current;

		container.scrollTop = scrollProgress * container.scrollHeight;
	}

	/**
	 *  Let parent components know that we reached the end of display
	 */
	_onEnd(isVisible) {
		if (!isVisible) return;
		const { onEnd } = this.props;
		if (onEnd) onEnd();
	}

	_getContainerStyle() {
		const { debug } = this.props;

		return {
			outline: debug && '1px solid seagreen',
			width: '100%',
			position: 'relative',
		};
	}

	// eslint-disable-next-line class-methods-use-this
	_getListStyle() {
		return {
			padding: 0,
			margin: 0,
			listStyle: 'none',
		};
	}

	_getListItemStyle(index, item) {
		const position = {
			padding: 0,
			margin: 0,
			position: 'absolute',
			...this._getItemDimensions(index, item),
		};

		return position;
	}

	// Picks the column in which to put the element
	// and returns its index
	_pickColumn() {
		const columnHeights = this.columns.map(items => {
			const lastItem = items[items.length - 1];
			return lastItem ? lastItem.height + lastItem.top : 0;
		});

		const columnIndex = columnHeights.indexOf(Math.min(...columnHeights));
		return columnIndex;
	}

	_getWidth() {
		const { gutter, outerGutter } = this.props;
		const colcount = this._getColumnCount();
		const containerWidth =
			this.container.current.offsetWidth - (colcount - 1) * gutter - (outerGutter ? 2 * gutter : 0);

		return Math.floor(containerWidth / colcount);
	}

	_getDimensions({ item }) {
		const { extraPx = 0 } = this.props;
		const width = this._getWidth();
		const height = Math.floor(width * item.ratio) + extraPx;
		return {
			width,
			height,
		};
	}

	_getLeft({ columnIndex }) {
		const { gutter, outerGutter } = this.props;
		return columnIndex * this._getWidth() + columnIndex * gutter + (outerGutter ? gutter : 0);
	}

	_getTop({ columnIndex }) {
		const { outerGutter, gutter } = this.props;
		const items = this.columns[columnIndex];
		const outer = outerGutter ? gutter : 0;
		return items && items.length ? last(items).top + last(items).height + gutter : outer;
	}

	_getItemDimensions(index, item) {
		const columnIndex = this._pickColumn();
		const { debug } = this.props;

		const dimensions = {
			outline: debug && '1px solid tomato',
			top: this._getTop({ columnIndex }),
			left: this._getLeft({ columnIndex }),
			...this._getDimensions({ item, columnIndex }),
		};

		this.columns[columnIndex] = [...this.columns[columnIndex], dimensions];

		return dimensions;
	}

	_isVisibleItem({ top, height }) {
		const { scrollTop } = this.state;
		const { offsetHeight } = this.container.current;
		const { safeSpace = offsetHeight / 2 } = this.props;

		const topVisible = top >= scrollTop - height - safeSpace;
		const bottomVisible = top <= scrollTop + offsetHeight + safeSpace;

		return topVisible && bottomVisible;
	}

	_setContainerHeight() {
		const el = this.list.current;

		const lastItems = this.columns.map(items => {
			const item = items[items.length - 1];
			return item.top + item.height;
		});

		el.style.height = `${max(lastItems)}px`;
	}

	_getColumnCount() {
		const { cols } = this.props;
		const mqs = compact(
			map(cols, (columnCount, key) => {
				const applies = this.container.current.offsetWidth >= key;
				return applies ? columnCount : false;
			}),
		);

		const colcount = last(mqs);

		return colcount;
	}

	renderItem({ index, item, maxIndex }) {
		const { items = [], itemRenderer } = this.props;
		const Component = itemRenderer;

		const style = this._getListItemStyle(index, item);

		const isVisible = this._isVisibleItem(style);

		if (index + 1 === maxIndex) {
			this._setContainerHeight();
		}
		const { ratio, background, fileData, id, week, mediaType } = item;
		return isVisible ? (
			<li key={id} style={style}>
				<Component items={{ ratio, background, fileData, id, week, mediaType }} />
				{items.length === index + 1 && (
					<div
						style={{
							position: 'absolute',
							top: -this.container.current.offsetHeight / 2,
							width: 1,
							height: 1,
						}}
					>
						<VisibilitySensor partialVisibility onChange={this._onEnd} />
					</div>
				)}
			</li>
		) : null;
	}

	render() {
		const { mounted } = this.state;
		const { items = [] } = this.props;

		if (mounted) {
			this.columns = new Array(this._getColumnCount()).fill([]);
		}

		const maxIndex = items.length;

		return (
			<div style={this._getContainerStyle()} ref={this.container}>
				<ul ref={this.list} style={this._getListStyle()}>
					{mounted && items.map((item, index) => this.renderItem({ index, item, maxIndex }))}
				</ul>
			</div>
		);
	}
}

Masonry.propTypes = {
	items: PropTypes.array.isRequired,
	itemRenderer: PropTypes.func.isRequired,
	debug: PropTypes.bool,
};

Masonry.defaultProps = {
	debug: 0,
};
export default withResizeDetector(Masonry);
