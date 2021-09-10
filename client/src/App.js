import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './utils/auth';


import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header';


const httpLink = createHttpLink({
  uri: '/graphql',  
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = ()=> {

console.log(authLink.concat(httpLink));

  if(!Auth.loggedIn()){
    return(
      <ApolloProvider client={client}>
        
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <Header /> 
            <div className="container">
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    )
  }
  return (
    <ApolloProvider client={client}>
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <Header /> 
            <div className="container">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/signup">
                  <Signup />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
    </ApolloProvider>
  );
}

export default App;
