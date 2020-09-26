import React from 'react';

function Badge({ faIcon, text }) {
	const faIcon1 = `fas fa-1x ${faIcon}`;
	return (
		<div className="control">
			<div className="tags has-addons">
				<span className="tag is-dark">{text}</span>
				<span className="tag is-success">
					<i className={faIcon1} />
				</span>
			</div>
		</div>
	);
}

export default Badge;
