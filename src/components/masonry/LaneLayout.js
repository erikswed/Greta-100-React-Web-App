import compact from 'lodash/compact';
import map from 'lodash/map';
import last from 'lodash/last';
import max from 'lodash/max';
import isNumber from 'lodash/isNumber';
import isBoolean from 'lodash/isBoolean';
import defer from 'lodash/defer';

import React from 'react';
import PropTypes from 'prop-types';

import normalizeWheel from 'normalize-wheel';
import ReactResizeDetector from 'react-resize-detector';
import VisibilitySensor from 'react-visibility-sensor';

class LaneLayout extends React.Component {
	
	static propTypes = {
		/**
		 * Config object for responsive behavior
		 */
		lanes: PropTypes.shape({
			/**
			 * vertical breakpoints (key = min-height, value = amount of rows)
			 */
			vertical: PropTypes.object.isRequired,
			/**
			 * horizontal breakpoints (key = min-width, value = amount of cols)
			 */
			horizontal: PropTypes.object.isRequired,
		}).isRequired,
		/* enable debug outlines */
		debug: PropTypes.bool,
		/* set mode to horizontal lanes */
		horizontal: PropTypes.bool,
		/* spacing between items */
		gutter: PropTypes.number,
		/* apply gutter on container sides/ends */
		outerGutter: PropTypes.bool,
		/* the items which are supposed to be displayed */
		items: PropTypes.arrayOf(
			PropTypes.shape({
				/**
				 * a unique identifier for this item
				 */
				key: PropTypes.string.isRequired,
				/**
				 * the width/height ratio of the item
				 */
				ratio: PropTypes.number.isRequired,
				/**
				 * the props to be passed to the itemRenderer component
				 */
				itemProps: PropTypes.object.isRequired,
			}),
		).isRequired,
		/**
		 * function/component used to render an item
		 */
		itemRenderer: PropTypes.func,
		/**
		 * function to be called when reaching the end of the scrollable area
		 */
		onEnd: PropTypes.func,
		autoScroll: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
	};

	static defaultProps = {
		debug: false,
		horizontal: false,
		gutter: 16,
		outerGutter: true,
		itemRenderer: () => null,
		onEnd: () => null,
		autoScroll: false,
		lanes: {
			vertical: {
				0: 1, // 1 lane  if the component is less than 480px wide
				480: 2, // 2 lanes if the component is min. 480px wide
				720: 3, // 3 lanes if the component is min. 720px wide
				960: 4,
				1200: 5,
			},
			horizontal: {
				0: 1, // 1 lane when the component is less than 480px in height
				480: 2, // 2 lanes when the component is min 480px in height
				720: 3, // 3 lanes when the component is min 720px in height
				960: 4,
				1200: 5,
			},
		},
	};

	constructor() {
		super();

		/**
		 * References to DOM-Elements
		 */
		this.domrefs = {
			container: React.createRef(),
			list: React.createRef(),
		};

		this.state = {
			/* Did the component mount in the browser already? */
			mounted: false,
			/* Current scrollTop of container */
			scrollTop: 0,
			/* Current scrollLeft of container */
			scrollLeft: 0,
			/* the scroll-progress (0-1) */
			scrollProgress: 0,
			/* the key of the last hovered item */
			hoverItem: null,
		};

		this._containerStyles = this._containerStyles.bind(this);
		this._listStyles = this._listStyles.bind(this);
		this._renderItem = this._renderItem.bind(this);
		this._itemStyles = this._itemStyles.bind(this);
		this._laneCount = this._laneCount.bind(this);
		this._pickLane = this._pickLane.bind(this);
		this._itemTop = this._itemTop.bind(this);
		this._itemHeight = this._itemHeight.bind(this);
		this._itemWidth = this._itemWidth.bind(this);
		this._itemSize = this._itemSize.bind(this);
		this._onScrollEnd = this._onScrollEnd.bind(this);
		this._fixListDimensions = this._fixListDimensions.bind(this);
		this._isVisibleItem = this._isVisibleItem.bind(this);
		this._onScroll = this._onScroll.bind(this);
		this._onWheel = this._onWheel.bind(this);
		this._onResize = this._onResize.bind(this);
		this._autoScroll = this._autoScroll.bind(this);
	}

	componentDidMount() {
		const { autoScroll } = this.props;

		this.setState({
			mounted: true,
		});

		this.domrefs.container.current.addEventListener(normalizeWheel.getEventType(), this._onWheel, false);

		this.domrefs.container.current.addEventListener('scroll', this._onScroll, false);

		autoScroll && this._autoScroll();
	}

	componentWillUnmount() {
		this.domrefs.container.current.removeEventListener(normalizeWheel.getEventType(), this._onWheel, false);
		this.domrefs.container.current.removeEventListener(
			'scroll',
			//this._onScroll,
			this._onScroll,
			false,
		);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.autoScroll !== this.props.autoScroll) {
			if (isNumber(newProps.autoScroll) || isBoolean(newProps.autoScroll)) {
				defer(this._autoScroll);
			}
		}

		if (newProps.horizontal !== this.props.horizontal) {
			defer(this._onResize);
		}
	}

	_autoScroll() {
		const { horizontal, autoScroll } = this.props;
		const { scrollLeft, scrollTop } = this.state;
		let container = this.domrefs.container.current;

		const scrollSpeed = isNumber(autoScroll) ? Math.abs(autoScroll) : 1;

		if (horizontal && container) {
			container.scrollLeft = scrollLeft + scrollSpeed;
		} else if (container) {
			container.scrollTop = scrollTop + scrollSpeed;
		}

		if (autoScroll === true || (isNumber(autoScroll) && autoScroll !== 0)) {
			window.requestAnimationFrame(this._autoScroll);
		}
	}

	_onWheel(e) {
		e.stopPropagation();
		e.preventDefault();
		const { horizontal } = this.props;
		const container = this.domrefs.container.current;
		const normalized = normalizeWheel(e);
		const { pixelY } = normalized;
		const prop = horizontal ? 'scrollLeft' : 'scrollTop';

		container[prop] = container[prop] + pixelY;
	}

	_onScroll() {
		const { horizontal } = this.props;

		let {
			scrollTop,
			scrollLeft,
			scrollHeight,
			scrollWidth,
			offsetWidth,
			offsetHeight,
		} = this.domrefs.container.current;

		scrollTop = scrollTop === 0 ? this.state.scrollProgress * scrollHeight : scrollTop;
		scrollLeft = scrollLeft === 0 ? this.state.scrollProgress * scrollWidth : scrollLeft;

		const scrollMax = horizontal ? scrollWidth - offsetWidth : scrollHeight - offsetHeight;

		const scrollProgress = (1 / scrollMax) * (horizontal ? scrollLeft : scrollTop);

		this.setState({
			scrollLeft,
			scrollTop,
			scrollProgress,
		});
	}

	/**
	 * Approximate previous scroll-position after container was resized
	 */
	_onResize() {
		this.setState({
			lastResize: new Date().getTime(),
		});

		defer(() => {
			const { horizontal } = this.props;
			const { scrollProgress } = this.state;
			const container = this.domrefs.container.current;
			const { scrollHeight, scrollWidth, offsetHeight, offsetWidth } = container;

			if (horizontal) {
				// Find a solution
				container.scrollLeft = scrollProgress * (scrollWidth - offsetWidth);
			} else {
				container.scrollTop = scrollProgress * (scrollHeight - offsetHeight);
			}
		});
	}
	/**
	 * Returns the Containers' CSS
	 */
	_containerStyles() {
		const { debug, horizontal } = this.props;

		return {
			position: 'absolute',
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			width: '100%',
			height: '100%',
			outline: debug && '1px solid tomato',
			transform: 'translate3d(0,0,0)',
			overflow: 'auto',
			overflowX: !horizontal && 'hidden',
			overflowY: horizontal && 'hidden',
			/** iOS specific scroll behavior instructions  */
			overflowScrolling: 'touch',
			WebkitOverflowScrolling: 'touch',
		};
	}

	/**
	 * Returns the Item-Containers' CSS
	 */
	_listStyles() {
		const { debug } = this.props;

		return {
			padding: 0,
			margin: 0,
			listStyle: 'none',
			outline: debug && '1px solid tomato',
			transform: 'translate3d(0,0,0)',
		};
	}

	/**
	 * Returns the index of the lane which should receive the next item
	 */
	_pickLane() {
		const { horizontal } = this.props;
		const prop1 = horizontal ? 'width' : 'height';
		const prop2 = horizontal ? 'left' : 'top';

		const laneDimensions = this.lanes.map(items => {
			let lastItem = items[items.length - 1];
			return lastItem ? lastItem[prop1] + lastItem[prop2] : 0;
		});

		return laneDimensions.indexOf(Math.min(...laneDimensions));
	}

	_itemHeight({ laneCount }) {
		const { gutter, outerGutter } = this.props;
		const containerHeight =
			this.domrefs.container.current.offsetHeight - (laneCount - 1) * gutter - (outerGutter ? 2 * gutter : 0);

		return Math.floor(containerHeight / laneCount);
	}

	_itemWidth({ laneCount }) {
		const { gutter, outerGutter } = this.props;

		const containerWidth =
			this.domrefs.container.current.offsetWidth - (laneCount - 1) * gutter - (outerGutter ? 2 * gutter : 0);

		return Math.floor(containerWidth / laneCount);
	}

	_itemSize(props) {
		const { item } = props;
		const { horizontal } = this.props;
		let height, width;

		if (horizontal) {
			height = this._itemHeight(props);
			width = height * item.ratio;
		} else {
			width = this._itemWidth(props);
			height = Math.floor((1 / item.ratio) * width);
		}

		return {
			width,
			height,
		};
	}

	_itemLeft({ laneIndex, width, height }) {
		const { horizontal } = this.props;
		const { gutter, outerGutter } = this.props;

		// Horizontal
		if (horizontal) {
			const items = this.lanes[laneIndex];
			const item = last(items);

			return items && items.length ? item.left + item.width + gutter : outerGutter ? gutter : 0;
		} else {
			// Vertical
			return laneIndex * width + laneIndex * gutter + (outerGutter ? gutter : 0);
		}
	}

	_itemTop(props) {
		const { laneIndex, height } = props;
		const { horizontal, gutter, outerGutter } = this.props;
		const items = this.lanes[laneIndex];
		const item = last(items);

		if (horizontal) {
			if (items.length) {
				return last(items).top;
			}

			return height * laneIndex + laneIndex * gutter + (outerGutter ? gutter : 0);
		} else {
			return items.length ? item.top + item.height + gutter : outerGutter ? gutter : 0;
		}
	}
	/**
	 * Return styles for the specified item
	 */
	_itemStyles({ index, item, maxIndex, laneCount }) {
		const { debug } = this.props;
		const laneIndex = this._pickLane();

		const payload = { index, item, maxIndex, laneIndex, laneCount };
		const dimensions = this._itemSize(payload);

		const css = {
			outline: debug && '1px solid tomato',
			padding: 0,
			margin: 0,
			position: 'absolute',
			transform: 'translate3d(0,0,0)',
			...dimensions,
			top: this._itemTop({ ...payload, ...dimensions }),
			left: this._itemLeft({ ...payload, ...dimensions }),
		};

		this.lanes[laneIndex] = [...this.lanes[laneIndex], css];

		return css;
	}
	/**
	 * Sets the height/width of the list according to its tallest/widest lane
	 */
	_fixListDimensions() {
		const { offsetHeight, offsetWidth } = this.domrefs.container.current;
		const { horizontal, gutter, outerGutter } = this.props;
		const el = this.domrefs.list.current;

		const lastItems = this.lanes.map(items => {
			let item = items[items.length - 1];
			return horizontal ? item.left + item.width : item.top + item.height;
		});

		const size = max(lastItems) + (outerGutter ? gutter : 0);

		el.style.width = horizontal ? size + 'px' : offsetWidth + 'px';
		el.style.height = horizontal ? offsetHeight + 'px' : size + 'px';
	}
	/**
	 * Checks wether the item which should be rendered is
	 * actually visible on the screen
	 */
	_isVisibleItem({ top, left, width, height }) {
		const { horizontal } = this.props;
		const { scrollTop, scrollLeft } = this.state;
		const { offsetHeight, offsetWidth } = this.domrefs.container.current;

		if (horizontal) {
			const leftVisible = left >= scrollLeft - width;
			const rightVisible = left <= scrollLeft + offsetWidth;

			return leftVisible && rightVisible;
		} else {
			const topVisible = top >= scrollTop - height;
			const bottomVisible = top <= scrollTop + offsetHeight;

			return topVisible && bottomVisible;
		}
	}

	_renderItem({ index, item, maxIndex, laneCount }) {
		const { hoverItem } = this.state;
		const { itemRenderer } = this.props;
		const Component = itemRenderer;
		const style = this._itemStyles({ index, item, maxIndex, laneCount });
		const isVisible = this._isVisibleItem(style);

		if (index === maxIndex) {
			this._fixListDimensions({});
		}

		if (hoverItem === item.key) {
			style.zIndex = '1';
		}

		return isVisible ? (
			<li key={item.key} style={style} onMouseEnter={() => this.setState({ hoverItem: item.key })}>
				<Component {...item.itemProps} />
				{index === maxIndex && this._renderVisibilityChecker()}
			</li>
		) : null;
	}
	/**
	 * Renders a helper component which tells us
	 * when we reached the end of the scrollable area
	 */
	_renderVisibilityChecker() {
		return <VisibilitySensor containment={this.domrefs.container.current} onChange={this._onScrollEnd} />;
	}

	/**
	 * Triggered when user reaches the end of the scrollable area
	 */
	_onScrollEnd() {
		this.props.onEnd && this.props.onEnd();
	}

	/**
	 * Returns the amount of lanes configured
	 */
	_laneCount() {
		const { lanes, horizontal } = this.props;
		const config = lanes[horizontal ? 'horizontal' : 'vertical'];
		const prop = horizontal ? 'offsetHeight' : 'offsetWidth';
		const containerWidth = this.domrefs.container.current[prop];

		const mqs = compact(
			map(config, (laneCount, key) => {
				const applies = containerWidth >= key;
				return applies ? laneCount : false;
			}),
		);

		const colcount = last(mqs);

		return colcount;
	}

	render() {
		const { items = [] } = this.props;
		const { mounted } = this.state;

		if (!items.length) {
			return null;
		}

		const laneCount = mounted && this._laneCount();

		if (mounted) {
			this.lanes = new Array(laneCount).fill([]);
		}

		const maxIndex = items.length ? items.length - 1 : 0;

		return (
			<div ref={this.domrefs.container} style={this._containerStyles()}>
				<ul ref={this.domrefs.list} style={this._listStyles()}>
					{mounted && items.map((item, index) => this._renderItem({ index, item, maxIndex, laneCount }))}
				</ul>
				<ReactResizeDetector handleWidth handleHeight onResize={this._onResize} />
			</div>
		);
	}
}
export default LaneLayout;
