import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Font } from 'expo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Navigation from './Navigation'
import reducer from './reducers/'

const store = createStore(reducer)

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://blooming-garden-30605.herokuapp.com/graphql',
  }),
  cache: new InMemoryCache(),
})

export default class App extends React.Component {
  state = {
    fonts: false,
  }
  componentDidMount() {
    Font.loadAsync({
      'raleway-extra-bold': require('./assets/Raleway-ExtraBold.ttf'),
      'raleway-bold': require('./assets/Raleway-Bold.ttf'),
      'raleway-regular': require('./assets/Raleway-Regular.ttf'),
      'raleway-thin': require('./assets/Raleway-Light.ttf'),
    }).then(() => this.setState({ fonts: true }))
  }
  render() {
    return this.state.fonts ? (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </ApolloProvider>
    ) : null
  }
}
