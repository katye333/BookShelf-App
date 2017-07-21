import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Bookcase from './Bookcase';

ReactDOM.render(
	<BrowserRouter><Bookcase /></BrowserRouter>,
	document.getElementById('root')
);