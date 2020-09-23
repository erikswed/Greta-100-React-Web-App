import React, { Component } from 'react';
import '../../styles/overlay-pdf-renderer.scss';

class OverlayPdf extends Component {
	constructor(props) {
		super(props);
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
				that.setState({ hoverIndex: id });
			}, 500);
		}
	};

	handleMouseLeave = () => {
		clearTimeout(this.timeout);
		this.setState({ hoverIndex: null });
	};

	render() {
		const { fileData } = this.props;
		const { hoverIndex } = this.state;

		return (
			<div
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
				className={`box-container-pdf ${hoverIndex === fileData ? 'hovered-pdf' : ''}`}
				id={fileData}
				key={fileData}
			>
				<div className="box-content-pdf">
					<div className="text-group-pdf">PDF File</div>

					<div className="btn-group-pdf">
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

export default OverlayPdf;
