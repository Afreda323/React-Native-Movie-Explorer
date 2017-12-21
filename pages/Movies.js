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

import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'

import * as actions from '../actions/movie.actions'

import ImageList from '../components/ImageList'
import FilterList from '../components/FilterList'

import colors from '../constants/colors'
import font from '../constants/fontFamily'
import other from '../query/other'

class Movies extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Movies',
    headerStyle: {
      backgroundColor: colors.black,
      paddingTop: 10,
      marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    headerTitleStyle: {
      color: colors.white,
      fontSize: 18,
      fontFamily: font.regular,
    },

    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-film' : 'ios-film-outline'}
        size={30}
        color={focused ? colors.mediumRed : colors.white}
      />
    ),
  })
  componentDidMount() {
    StatusBar.setBarStyle('light-content', true)
    this.props.navigation.navigate('MovieDetail', { id: "181808" })
    
  }
  handleFilter = filter => {
    if (filter === 'popular') {
      return 'Popular'
    } else if (filter === 'upcoming') {
      return 'Coming Soon'
    } else if (filter === 'nowPlaying') {
      return 'Now Playing'
    } else if (filter === 'topRated') {
      return 'Top Rated'
    }
  }
  render() {
    const { other, error, loading } = this.props.data
    const { navigate } = this.props.navigation
    if (error) {
      console.log(error)
    }
    return (
      <View style={styles.page}>
        <FilterList
          active={this.handleFilter(this.props.activeFilter)}
          filters={['Popular', 'Coming Soon', 'Now Playing', 'Top Rated']}
          onPress={val => this.props.updateFilter(val)}
        />
        {other && (
          <ImageList
            filter={this.handleFilter(this.props.activeFilter)}
            onLoadMore={this.props.loadMoreEntries}
            movies={other.results}
            onClick={id => navigate('MovieDetail', { id })}
          />
        )}
        {loading && (
          <Text
            style={{
              color: colors.white,
              fontFamily: font.thin,
              fontSize: 20,
            }}>
            Loading...
          </Text>
        )}
      </View>
    )
  }
}

const withRedux = component => connect(({ movie }) => movie, actions)(component)

const withApollo = component =>
  graphql(other, {
    options: ({ activeFilter }) => {
      return { variables: { filter: activeFilter, page: 1 } }
    },
    props({ data }) {
      return {
        data,
        loadMoreEntries() {
          return data.fetchMore({
            variables: {
              page: data.other.page + 1,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult
              }
              return Object.assign({}, previousResult, {
                other: {
                  ...previousResult.other,
                  page: previousResult.other.page + 1,
                  results: [
                    ...previousResult.other.results,
                    ...fetchMoreResult.other.results,
                  ],
                },
              })
            },
          })
        },
      }
    },
  })(component)

export default compose(withRedux, withApollo)(Movies)

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.black,
    flex: 1,
  },
})
