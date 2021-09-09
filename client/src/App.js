import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from './utils/auth';

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

function App() {



  if(!Auth.loggedIn()){
    return(
      <div>You need to log in</div>
    )
  }
  return (
    <ApolloProvider client={client}>
      <Router>
      Hello World!
      </Router>      
    </ApolloProvider>
  );
}

export default App;
