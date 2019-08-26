import React from 'react';
import ReactDOM from 'react-dom';
import {RandomUser} from './RandomUser';
import * as serviceWorker from './serviceWorker';
import { usePromiseTracker } from "react-promise-tracker";

const LoadingIndicator = props => {
	const { promiseInProgress } = usePromiseTracker();
	return (
		promiseInProgress && 
		<h1><i className="fa fa-spinner fa-spin" /> Loading...</h1>
 	);  
}

ReactDOM.render(<div><RandomUser /><LoadingIndicator/></div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
