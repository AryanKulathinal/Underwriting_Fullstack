import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "@/components/ui/provider";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
