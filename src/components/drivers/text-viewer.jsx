/* eslint-disable max-classes-per-file */
import React, { Component } from 'react';
import '../../styles/text-viewer.scss';
import uniqueId from 'lodash/uniqueId';
import Loading from '../file-viewer/loading';

class TextViewer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	onCanView() {
		this.setState({ loading: false });
	}

	renderLoading() {
		const { loading } = this.state;
		if (loading) {
			return <Loading />;
		}
		return null;
	}

	render = () => {
		const { filePath } = this.props;
		return <TextFileReader txt={filePath} />;
	};
}

export default TextViewer;

export class TextFileReader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: '',
		};
	}

	componentDidMount() {
		const { txt } = this.props;
		this.readTextFile(txt);
	}

	readTextFile = file => {
		const rawFile = new XMLHttpRequest();
		rawFile.open('GET', file, false);
		rawFile.onreadystatechange = () => {
			if (rawFile.readyState === 4) {
				if (rawFile.status === 200 || rawFile.status == 0) {
					const allText = rawFile.responseText;
					this.setState({
						text: allText,
					});
				}
			}
		};
		rawFile.send(null);
	};

	render() {
		const { text } = this.state;
		return (
			<div
				style={{
					backgroundColor: 'white',
				}}
			>
				{text.split('\n').map(item => {
					return (
						<span key={uniqueId()}>
							{item}
							<br />
						</span>
					);
				})}
			</div>
		);
	}
}
