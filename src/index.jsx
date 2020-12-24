import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { FirebaseContext } from './firebase';
import store, { firebase } from './redux/store';

ReactDOM.render(
	<FirebaseContext.Provider value={firebase}>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</FirebaseContext.Provider>,
	document.getElementById('root'),
);
