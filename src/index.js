import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {message} from 'antd';
message.config({
  duration: 1
})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
