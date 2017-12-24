import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  StyleSheet,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'

import search from '../query/search'
import { updateSearchInput, clearSearchInput } from '../actions/movie.actions'

import Searchbar from '../components/Searchbar'
import SearchResults from '../components/SearchResults'

import colors from '../constants/colors'
import font from '../constants/fontFamily'


class Search extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Search',
    headerStyle: {
      backgroundColor: colors.black,
      paddingTop: 10,
      marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    headerTitleStyle: {
      color: colors.white,
      fontSize: 18,
      fontFamily: font.regular,
      alignSelf: 'center'
    },

    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-search' : 'ios-search-outline'}
        size={30}
        color={focused ? colors.mediumRed : colors.white}
      />
    ),
  })
  componentDidMount() {
    StatusBar.setBarStyle('light-content', true)
  }
  render() {
    const { data, navigation } = this.props
    const { navigate } = navigation
    return (
      <View style={styles.page}>
        <Searchbar
          value={ this.props.searchInput}
          onChange={this.props.updateSearchInput}
          onClear={this.props.clearSearchInput}
        />
        {data &&
        data.search && (
          <SearchResults
            onClick={id => navigate('MovieDetail', { id })}
            results={data.search.results}
          />
        )}
        {data &&
        data.loading && (
          <Text style={{ color: colors.white, fontFamily: font.thin }}>
            Loading...
          </Text>
        )}
      </View>
    )
  }
}

const withRedux = connect(({ movie }) => movie, { updateSearchInput, clearSearchInput })

const withApollo = graphql(search, {
    options: ({ searchInput }) => {
      return {
        variables: {
          query: searchInput,
          page: 1,
        },
      }
    },
    skip: ({ searchInput }) => searchInput.trim() === '',
  })

export default compose(withRedux, withApollo)(Search)

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.black,
    flex: 1,
  },
})
