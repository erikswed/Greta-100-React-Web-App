import React, { Component } from 'react';
import '../../styles/overlay-pdf-renderer.scss';
class OverlayPdf extends Component {
	constructor(props) {
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
				if (document.getElementById( "pdf-box" ) != null)
					document.getElementById( "pdf-box" ).style.pointerEvents = 'auto';
				that.setState({ hoverIndex: id });
			}, 500);
		}
	};

	handleMouseLeave = () => {
		clearTimeout(this.timeout);
		if (document.getElementById( "pdf-box" ) != null)
			document.getElementById( "pdf-box" ).style.pointerEvents = 'none';
		this.setState({ hoverIndex: null });
	};

	render() {
		const { fileData } = this.props;
		const { hoverIndex } = this.state;
		return (
			<div className={`box-container-pdf ${hoverIndex === "pdf-box" ? 'hovered-pdf' : ''}`}
			 id={"pdf-box"} key={fileData} 	
			 onMouseLeave={this.handleMouseLeave}
			>
				<div className="clickBox-pdf"
					onMouseEnter={this.handleMouseEnter}
					id={"pdf-box"}
				></div>
				<div className="box-content-pdf" onMouseLeave={this.handleMouseLeave}>
					<div className="text-group-pdf">Pdf File</div>

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
