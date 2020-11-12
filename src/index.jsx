import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { FirebaseContext } from './firebase';
import store, { firebase } from './redux/store';

ReactDOM.render(
	<FirebaseContext.Provider value={firebase}>
		<Provider store={store}>
			<App />
		</Provider>
	</FirebaseContext.Provider>,

	document.getElementById('root'),
);
