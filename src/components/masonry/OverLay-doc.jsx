import React, { Component } from 'react';
import '../../styles/overlay-doc-renderer.scss';

class OverlayDoc extends Component {
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
				if (document.getElementById('doc-box') != null) document.getElementById('doc-box').style.pointerEvents = 'auto';
				that.setState({ hoverIndex: id });
			}, 500);
		}
	};

	handleMouseLeave = () => {
		clearTimeout(this.timeout);
		if (document.getElementById('doc-box') != null) document.getElementById('doc-box').style.pointerEvents = 'none';
		this.setState({ hoverIndex: null });
	};

	render() {
		const { fileData } = this.props;
		const { hoverIndex } = this.state;
		return (
			<div
				className={`box-container-doc ${hoverIndex === 'doc-box' ? 'hovered-doc' : ''}`}
				id="doc-box"
				key={fileData}
				onMouseLeave={this.handleMouseLeave}
			>
				<div className="clickBox-doc" onMouseEnter={this.handleMouseEnter} id="doc-box" />
				<div className="box-content-doc" onMouseLeave={this.handleMouseLeave}>
					<div className="text-group-doc">Doc File</div>

					<div className="btn-group-doc">
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

export default OverlayDoc;
