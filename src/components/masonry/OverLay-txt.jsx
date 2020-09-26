import React, { Component } from 'react';
import '../../styles/overlay-txt-renderer.scss';

class OverlayTxt extends Component {
	constructor() {
		super();
		this.state = {
			hoverIndex: null,
		};
	}

	componentWillUnmount() {
		clearTimeout();
	}

	handleMouseEnter = e => {
		if (e.target.id !== null) {
			const that = this;
			const { id } = e.target;
			this.timeout = setTimeout(function Foo() {
				// set the pointerEvents to auto so user can click buttons
				if (document.getElementById('txt-box') != null) document.getElementById('txt-box').style.pointerEvents = 'auto';
				that.setState({ hoverIndex: id });
			}, 500);
		}
	};

	handleMouseLeave = () => {
		clearTimeout(this.timeout);
		if (document.getElementById('txt-box') != null) document.getElementById('txt-box').style.pointerEvents = 'none';
		this.setState({ hoverIndex: null });
	};

	render() {
		const { fileData } = this.props;
		const { hoverIndex } = this.state;
		return (
			<div
				className={`box-container-txt ${hoverIndex === 'txt-box' ? 'hovered-txt' : ''}`}
				id="txt-box"
				key={fileData}
				onMouseLeave={this.handleMouseLeave}
			>
				<div className="clickBox-txt" onMouseEnter={this.handleMouseEnter} id="txt-box" />
				<div className="box-content-txt" onMouseLeave={this.handleMouseLeave}>
					<div className="text-group-txt">Text File</div>

					<div className="btn-group-txt">
						<button className="btn btn-secondary" type="button">
							Open File
						</button>
						<button className="btn btn-secondary" type="button">
							Edit Description
						</button>
						<button className="btn btn-secondary" type="button">
							Download
						</button>
						<button className="btn btn-secondary" type="button">
							Push me for fun
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default OverlayTxt;
