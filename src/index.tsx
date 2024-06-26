import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app/App';
import store from './app/store';
import './index.css';
import React from "react";

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);

  root.render(

    <Provider store={store} >
      <BrowserRouter basename="/weathersite" >
        <App />
      </BrowserRouter>
    </Provider>

  );
} else {
  console.error("Root element not found");
}
//basename="/weathersite"



