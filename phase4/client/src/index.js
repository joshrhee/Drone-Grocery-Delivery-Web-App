//yarn add react-bootstrap bootstrap
//yarn add react-router-dom redux react-redux redux-promise redux-thunk axios --save

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';


import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);