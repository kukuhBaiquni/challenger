import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './interface.css'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
