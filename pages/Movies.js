import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import ImageList from '../components/ImageList'
import FilterList from '../components/FilterList'

import colors from '../constants/colors'

class Movies extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Movies',
    headerStyle: {
      backgroundColor: colors.black,
    },
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('Search')}
        style={{ marginRight: 10, padding: 10 }}>
        <Ionicons name={'ios-search-outline'} size={27} color={colors.white} />
      </TouchableOpacity>
    ),
    headerTitleStyle: {
      color: colors.white,
    },

    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-play' : 'ios-play-outline'}
        size={32}
        color={focused ? colors.mediumRed : colors.white}
      />
    ),
  })
  state = {
    activeFilter: 'Popular',
  }
  handleFilter = filter => {
    this.setState({ activeFilter: filter })
  }
  render() {
    return (
      <View>
        <FilterList
          active={this.state.activeFilter}
          filters={['Popular', 'Coming Soon', 'Now Playing', 'Top Rated']}
          onPress={val => this.handleFilter(val)}
        />
        <ImageList />
      </View>
    )
  }
}

export default Movies
