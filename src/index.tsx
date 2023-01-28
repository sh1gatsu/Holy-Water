import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LocalStorageProvider } from './Context/LocalStorageContext';
import { FormProvider } from './Context/FormContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <LocalStorageProvider>
    <FormProvider>
      <App />
    </FormProvider>
  </LocalStorageProvider>
);

reportWebVitals();
