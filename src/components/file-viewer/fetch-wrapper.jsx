// Copyright (c) 2017 PlanGrid, Inc.

import React, { Component } from 'react';
import Error from './error';
import Loading from './loading';

function WithFetching(WrappedComponent) {
	return class FetchComponent extends Component {
		constructor(props) {
			super(props);
			this.state = {};
			this.xhr = this.createRequest(props.filePath);
		}

		componentDidMount() {
			try {
				this.fetch();
			} catch (e) {
				const { onError } = this.props;
				if (onError) {
					onError(e);
				}
				this.setState({ error: 'fetch error' });
			}
		}

		componentWillUnmount() {
			this.abort();
		}

		createRequest(path) {
			let xhr = new XMLHttpRequest();

			if ('withCredentials' in xhr) {
				// XHR for Chrome/Firefox/Opera/Safari.
				xhr.open('GET', path, true);
				// } else if (typeof XDomainRequest !== 'undefined') {
				// 	// XDomainRequest for IE.
				// 	xhr = new XDomainRequest();
				// 	xhr.open('GET', path);
			} else {
				// CORS not supported.
				xhr = null;
				return null;
			}
			const { responseType } = this.props;
			if (responseType) {
				xhr.responseType = responseType;
			}

			xhr.onload = () => {
				if (xhr.status >= 400) {
					this.setState({ error: `fetch error with status ${xhr.status}` });
					return;
				}
				const resp = responseType ? xhr.response : xhr.responseText;

				this.setState({ data: resp });
			};

			return xhr;
		}

		fetch() {
			this.xhr.send();
		}

		abort() {
			if (this.xhr) {
				this.xhr.abort();
			}
		}

		render() {
			if (!this.xhr) {
				return <h1>CORS not supported..</h1>;
			}

			const { error } = this.state;

			if (error) {
				return <Error {...this.props} error={error} />;
			}

			const { data } = this.state;

			if (data) {
				const { filePath, responseType } = this.props;
				return <WrappedComponent data={data} filePath={filePath} responseType={responseType} />;
			}
			return <Loading />;
		}
	};
}

export default WithFetching;
