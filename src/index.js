import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import routers from './routes/router';
import './assets/css/style.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/store';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from 'utils';

const store = createStore(rootReducer);
const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <MsalProvider instance={msalInstance}>
            <RouterProvider router={routers} />
        </MsalProvider>
    </Provider>
);

reportWebVitals();
