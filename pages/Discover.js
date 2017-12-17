import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import ImageList from '../components/ImageList'
import FilterModal from '../components/FilterModal'

class Discover extends Component {
  static navigationOptions = {
    title: 'Discover',
    headerStyle: {
      backgroundColor: 'rgba(0,0,0,.7)',
    },
    headerTitleStyle: {
      color: '#fff',
    },

    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-eye' : 'ios-eye-outline'}
        size={30}
        color={focused ? '#c32b2b' : '#fff'}
      />
    ),
  }
  render() {
    return (
      <View>
        <Text>Discover</Text>
        <FilterModal />
        <ImageList />
      </View>
    )
  }
}

export default Discover
