import axios from 'axios';
import { sampleSize } from 'lodash';

export default async () => {
	return new Promise(resolve => {
		axios.get('https://picsum.photos/list').then(res => {
			return resolve(sampleSize(res.data, 50));
		});
	});
};
