import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import apiSaga from './sagas.generator';
import rootReducer from './root-reducer';
import Firebase from '../firebase/Firebase';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const firebase = new Firebase();

const initialiseSagaMiddleware = createSagaMiddleware({
	context: {
		firebase,
	},
});

const middlewares = [thunk.withExtraArgument(firebase), initialiseSagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
	middlewares.push(logger);
}

// In development, use the browser's Redux dev tools extension if installed
const enhancers = [];
const isDevelopment = process.env.NODE_ENV === 'development';
if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
	enhancers.push(window.devToolsExtension());
}

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(...middlewares), ...enhancers));

initialiseSagaMiddleware.run(apiSaga);

export default store;
