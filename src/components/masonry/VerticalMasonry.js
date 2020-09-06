/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { withResizeDetector } from 'react-resize-detector';
import VisibilitySensor from 'react-visibility-sensor';
import { max, map, compact, last } from 'lodash';

class VerticalMasonry extends React.Component {
	constructor(props) {
		super(props);
		this.container = React.createRef();
		this.list = React.createRef();
		this.state = {
			mounted: false,
			scrollLeft: 0,
		};

		this._onEnd = this._onEnd.bind(this);
		this._isVisibleItem = this._isVisibleItem.bind(this);
		this._setListWidth = this._setListWidth.bind(this);
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
		const { scrollLeft, scrollWidth } = this.container.current;

		this.setState({
			scrollLeft,
			scrollProgress: (1 / scrollWidth) * scrollLeft,
		});
	}

	/**
	 * Approximate previous scroll-position after container was resized
	 */
	_onResize() {
		const { scrollProgress } = this.state;
		const container = this.container.current;

		container.scrollLeft = scrollProgress * container.scrollWidth;
	}

	/**
	 *  Let parent components know that we reached the end of display
	 */
	_onEnd(isVisible) {
		if (!isVisible) return;
		this.props.onEnd && this.props.onEnd();
	}

	_getContainerStyle() {
		const { infinite, debug } = this.props;

		const infiniteStyles = infinite
			? {
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					overflow: 'auto',
			  }
			: {};

		return {
			outline: debug && '1px solid seagreen',
			width: '100%',
			position: 'relative',
			...infiniteStyles,
		};
	}

	// eslint-disable-next-line class-methods-use-this
	_getListStyle() {
		return {
			padding: 0,
			margin: 0,
			listStyle: 'none',
			height: 1,
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
		const columnWidths = this.columns.map(items => {
			const lastItem = items[items.length - 1];
			return lastItem ? lastItem.width + lastItem.left : 0;
		});

		const columnIndex = columnWidths.indexOf(Math.min(...columnWidths));
		return columnIndex;
	}

	_getWidth() {
		const { gutter, outerGutter } = this.props;
		const colcount = this._getRowCount();
		const containerHeight =
			this.container.current.offsetHeight - (colcount - 1) * gutter - (outerGutter ? 2 * gutter : 0);

		return Math.floor(containerHeight / colcount);
	}

	_getHeight() {
		const { gutter, outerGutter } = this.props;
		const colcount = this._getRowCount();
		const containerHeight =
			this.container.current.offsetHeight - (colcount - 1) * gutter - (outerGutter ? 2 * gutter : 0);

		return Math.floor(containerHeight / colcount);
	}

	_getDimensions({ item }) {
		const height = this._getHeight();
		const width = height / item.ratio;

		return {
			width,
			height,
		};
	}

	_getLeft({ columnIndex }) {
		const { gutter, outerGutter } = this.props;
		const items = this.columns[columnIndex];
		const out = outerGutter ? gutter : 0;
		return items && items.length ? last(items).left + last(items).width + gutter : out;
	}

	_getTop({ columnIndex }) {
		const { outerGutter, gutter } = this.props;

		const items = this.columns[columnIndex];
		const top = this._getHeight() * columnIndex + columnIndex * gutter + (outerGutter ? gutter : 0);

		return items && items.length ? last(items).top : top;
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

	_isVisibleItem(props) {
		const { left, width } = props;
		const { scrollLeft } = this.state;
		const { offsetWidth } = this.container.current;

		const isLeftIn = left + width >= scrollLeft;
		const isRightIn = left - width <= scrollLeft + offsetWidth;

		return isLeftIn && isRightIn;
	}

	_getRowCount() {
		const { rows } = this.props;
		const mqs = compact(
			map(rows, (columnCount, key) => {
				const applies = this.container.current.offsetHeight >= key;
				return applies ? columnCount : false;
			}),
		);

		const colcount = last(mqs);

		return colcount;
	}

	_setListWidth() {
		const el = this.list.current;

		const lastItems = this.columns.map(items => {
			const item = items[items.length - 1];
			return item.left + item.width;
		});
		el.style.width = `${max(lastItems)}px`;
	}

	renderItem({ index, item, maxIndex }) {
		const { items = [], itemRenderer } = this.props;
		const Component = itemRenderer;

		const style = this._getListItemStyle(index, item);

		const isVisible = this._isVisibleItem(style);

		if (index + 1 === maxIndex) {
			this._setListWidth();
		}
		const { ratio, background, fileData, id, week, mediaType } = item;
		return isVisible ? (
			<li key={id} style={style}>
				<Component items={{ ratio, background, fileData, id, week, mediaType }} />
				{items.length === index + 1 && (
					<div
						style={{
							position: 'absolute',
							left: -this.container.current.offsetWidth / 2,
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
			this.columns = new Array(this._getRowCount()).fill([]);
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

VerticalMasonry.propTypes = {
	items: PropTypes.array.isRequired,
	itemRenderer: PropTypes.func.isRequired,
	debug: PropTypes.bool,
};

VerticalMasonry.defaultProps = {
	debug: 0,
};
export default withResizeDetector(VerticalMasonry);
