/* eslint-disable import/prefer-default-export */
// import { ADD_ARTICLE } from '../constants/action-types';
// import { addBadWword } from '../actions/index';
// import { forbiddenWords } from '../constants/index';


// export function getDataMiddleware({ dispatch }) {
// 	return function (next) {
// 		return function (action) {
// 			if (action.type === GET_DATA) {
// 				if (action.type === GET_DATA) {
// 					return fetch(`https://jsonplaceholder.typicode.com/posts`)
// 						.then(res => res.json())
// 						.then(
// 							data => dispatch({ type: 'DATA_LOADED', payload: data }),
// 							err => dispatch({ type: 'LOAD_DATA_FAILURE', err }),
// 						);
// 				}
// 			}
// 			return next(action);
// 		};
// 	};
// }
