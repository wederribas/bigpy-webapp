import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import registerServiceWorker from './registerServiceWorker'
import App from './components/App/App'

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql/'
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
