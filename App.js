import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Font } from 'expo'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import createStore from './store/'

import Navigation from './Navigation'
import Loader from './components/Loader'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://blooming-garden-30605.herokuapp.com/graphql',
  }),
  cache: new InMemoryCache(),
})
const { persistor, store } = createStore()

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
  componentDidCatch(e) {
      console.log(e)
    }
  render() {
    
    return this.state.fonts ? (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <Navigation />
          </PersistGate>
        </Provider>
      </ApolloProvider>
    ) : null
  }
}
