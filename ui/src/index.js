import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './store';
import { persistStore } from 'redux-persist'
import Layout from './Layout';
import { green } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"
import { darkTheme } from './common/theme';

const theme = createTheme(darkTheme);

const root = ReactDOM.createRoot(document.getElementById('root'));

let persistor = persistStore(store);

const App = () => {
  return (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout />
          <ToastContainer autoClose={5000} draggable={false} limit={5} />
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
  );
}

root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);