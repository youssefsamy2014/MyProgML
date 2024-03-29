import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import {Provider} from 'react-redux';
import {createStore , applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import tokenReducer from './store/reducers/tokenReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store =createStore(tokenReducer,composeEnhancers(applyMiddleware(thunk)));



const app  =(
  <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
     </Provider>
 
);
ReactDOM.render(
  app,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
