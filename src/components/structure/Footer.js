import React from 'react';
// TODO do we still need this www.flaticon.com attribution

function Footer() {
	return (
		<footer className="footer has-background-link">
			<div className="content has-text-centered has-text-white">
				<p>
					Built at <i className="fas fa-surface" /> by{' '}
					<a href="https://github.com/erikswed" className="has-text-white">
						<strong>Erik Hellberg</strong>
					</a>
				</p>
				<div>
					Icons made by{' '}
					<a href="https://www.flaticon.com/authors/prettycons" title="prettycons">
						prettycons
					</a>{' '}
					from{' '}
					<a href="https://www.flaticon.com/" title="Flaticon">
						www.flaticon.com
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
