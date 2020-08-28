import React from 'react';
import moment from 'moment';
import preval from 'preval.macro';
import packageJson from '../../../package.json';

const buildTimestamp = preval`module.exports = new Date().getTime();`;

class ShowBuildAndVersion extends React.Component {
	getDateString = () => {
		const lastUpdateMoment = moment.unix(buildTimestamp / 1000);
		const formattedDate = lastUpdateMoment.format('DD.MM.YYYY HH:mm:ss');
		return formattedDate;
	};

	render() {
		return (
			<div>
				{'App Version: '}
				{packageJson.version}
				{' Build: '}
				{buildTimestamp}
				{' Date: '}
				{'('}
				{this.getDateString()}
				{')'}
			</div>
		);
	}
}

ShowBuildAndVersion.propTypes = {};

ShowBuildAndVersion.defaultProps = {};

export default ShowBuildAndVersion;
