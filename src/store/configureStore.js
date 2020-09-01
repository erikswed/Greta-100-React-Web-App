import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import notifyReducer from 'react-redux-notify';
import createSagaMiddleware from 'redux-saga';
import RootReducer from '../reducers/RootReducer';
import apiSaga from '../sagas/api-saga';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialiseSagaMiddleware = createSagaMiddleware();

const reducers = {
	rootReducer: RootReducer,
	notifications: notifyReducer,
};

const reduce = combineReducers({
	...reducers,
});
const middlewares = [thunk, initialiseSagaMiddleware];

// In development, use the browser's Redux dev tools extension if installed
const enhancers = [];
const isDevelopment = process.env.NODE_ENV === 'development';
if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
	enhancers.push(window.devToolsExtension());
}

const store = createStore(reduce, storeEnhancers(applyMiddleware(...middlewares), ...enhancers));

initialiseSagaMiddleware.run(apiSaga);

export default store;
