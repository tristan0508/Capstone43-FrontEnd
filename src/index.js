import React from 'react';
import ReactDOM from 'react-dom';
import { MacroTracker } from './MacroTracker'
import './index.css';
import "antd/dist/antd.css";

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
server.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});


ReactDOM.render(
  <React.StrictMode>
    <MacroTracker />
  </React.StrictMode>,
  document.getElementById('root')
);

