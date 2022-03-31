import './App.css';

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import { StoreProvider } from "./utils/GlobalState";

const client = new ApolloClient({
  //request: (operation) => {
  //  const token = localStorage.getItem('id_token')
  //  operation.setContext({
  //    headers: {
  //      authorization: token ? `Bearer ${token}` : ''
  //    }
  //  })
  //},
  uri: '/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route component={NoMatch} />
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
    //<div className="App">
     // <header className="App-header">
      //  <img src={logo} className="App-logo" alt="logo" />
      //  <p>
      //    Edit<code>src/App.js</code> and save to reload.
       // </p>
       // <a
        //  className="App-link"
        //  href="https://reactjs.org"
        //  target="_blank"
        //  rel="noopener noreferrer"
        //>
       //   Learn React
       // </a>
     // </header>
    //</div>
  );
}

export default App;