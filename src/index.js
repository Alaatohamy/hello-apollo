import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from "apollo-cache-inmemory";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const URI = 'http://localhost:3001/graphql';
const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache({
    addTypename: false
  })
});

// client
// .query({
//   query: gql`
//     {
//       allPosts{
//         id
//       }
//     }
//   `
// })
// .then(result => console.log(result));

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
