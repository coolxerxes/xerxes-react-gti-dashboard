import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import { queryClient } from 'config/react-query';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// eslint-disable-next-line import/extensions
import '../i18n.js';

import { Store } from './redux/Store';

const persistor = persistStore(Store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Provider store={Store}>
					<PersistGate loading={null} persistor={persistor}>
						<App />
					</PersistGate>
				</Provider>
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
);
