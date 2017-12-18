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

import { graphql } from 'react-apollo'

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
  state = {
    activeFilter: 'Popular',
  }
  componentDidMount() {
    StatusBar.setBarStyle('light-content', true)
  }
  handleFilter = filter => {
    this.setState({ activeFilter: filter })
    if (filter === 'Popular') {
      this.props.navigation.setParams({ filter: 'popular' })
    } else if (filter === 'Coming Soon') {
      this.props.navigation.setParams({ filter: 'upcoming' })
    } else if (filter === 'Now Playing') {
      this.props.navigation.setParams({ filter: 'nowPlaying' })
    } else if (filter === 'Top Rated') {
      this.props.navigation.setParams({ filter: 'topRated' })
    }
  }
  render() {
    const { other, error } = this.props.data
    if (error) {
      console.log(error)
    }
    return (
      <View style={styles.page}>
        <FilterList
          active={this.state.activeFilter}
          filters={['Popular', 'Coming Soon', 'Now Playing', 'Top Rated']}
          onPress={val => this.handleFilter(val)}
        />
        {other && (
          <ImageList
            filter={this.state.activeFilter}
            onScrollBottom={this.props.loadMoreEntries}
            movies={other.results}
            onClick={id => alert(id)}
          />
        )}
      </View>
    )
  }
}

export default graphql(other, {
  options: ({ navigation: { state: { params = { filter: 'popular' } } } }) => {
    return { variables: { filter: params.filter, page: 1 } }
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
})(Movies)

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.black,
    flex: 1,
  },
})
