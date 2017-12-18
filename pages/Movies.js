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
import gql from 'graphql-tag'

import ImageList from '../components/ImageList'
import FilterList from '../components/FilterList'

import colors from '../constants/colors'
import font from '../constants/fontFamily'

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
  }
  render() {
    const { loadMoreEntries, results, error } = this.props
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
        <ImageList
          onScrollBottom={loadMoreEntries}
          movies={MOVIES}
          onClick={id => alert(id)}
        />
      </View>
    )
  }
}
const QUERY = gql`
  query getPopular($page: Int!) {
    popular(page: $page) {
      page
      results {
        id
        poster_path
      }
    }
  }
`

export default graphql(QUERY, {
  options: ({ data }) => {
    return { variables: { page: 1 } }
  },
  props({ data: { loading, page, results, fetchMore, error} }) {
    return {
      loading,
      page,
      results,
      loadMoreEntries() {
        alert('Hello')
        return fetchMore({
          variables: {
            page: page + 1,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return previousResult
            }
            return Object.assign({}, previousResult, {
              results: [...previousResult.results, ...fetchMoreResult.results],
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

const MOVIES = [
  {
    id: '346364',
    poster_path: '/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg',
  },
  {
    id: '8844',
    poster_path: '/8wBKXZNod4frLZjAKSDuAcQ2dEU.jpg',
  },
  {
    id: '354912',
    poster_path: '/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
  },
  {
    id: '141052',
    poster_path: '/9rtrRGeRnL0JKtu9IMBWsmlmmZz.jpg',
  },
  {
    id: '181808',
    poster_path: '/xGWVjewoXnJhvxKW619cMzppJDQ.jpg',
  },
  {
    id: '211672',
    poster_path: '/q0R4crx2SehcEEQEkYObktdeFy.jpg',
  },
  {
    id: '419680',
    poster_path: '/rF2IoKL0IFmumEXQFUuB8LajTYP.jpg',
  },
  {
    id: '321612',
    poster_path: '/tWqifoYuwLETmmasnGHO7xBjEtt.jpg',
  },
  {
    id: '284053',
    poster_path: '/oSLd5GYGsiGgzDPKTwQh7wamO8t.jpg',
  },
  {
    id: '392044',
    poster_path: '/iBlfxlw8qwtUS0R8YjIU7JtM6LM.jpg',
  },
  {
    id: '347882',
    poster_path: '/wridRvGxDqGldhzAIh3IcZhHT5F.jpg',
  },
  {
    id: '355547',
    poster_path: '/tEbDvivUfsCupngKIfMJJ725eAD.jpg',
  },
  {
    id: '297762',
    poster_path: '/imekS7f1OuHyUP2LAiTEM0zBzUz.jpg',
  },
  {
    id: '371638',
    poster_path: '/jj84nF5vYRD0HUTowBKcrKk8hZP.jpg',
  },
  {
    id: '177572',
    poster_path: '/9gLu47Zw5ertuFTZaxXOvNfy78T.jpg',
  },
  {
    id: '245891',
    poster_path: '/5vHssUeVe25bMrof1HyaPyWgaP.jpg',
  },
  {
    id: '281338',
    poster_path: '/3vYhLLxrTtZLysXtIWktmd57Snv.jpg',
  },
  {
    id: '315635',
    poster_path: '/ApYhuwBWzl29Oxe9JJsgL7qILbD.jpg',
  },
  {
    id: '343668',
    poster_path: '/34xBL6BXNYFqtHO9zhcgoakS4aP.jpg',
  },
  {
    id: '440021',
    poster_path: '/cTaEIUYTt52ooq9quVbAQ7NpGwo.jpg',
  },
]
