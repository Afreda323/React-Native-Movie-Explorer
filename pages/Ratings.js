import React, { Component } from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import RatingsList from '../components/RatingsList'

class Ratings extends Component {
  static navigationOptions = {
    title: 'Your Ratings',
    headerStyle: {
      backgroundColor: 'rgba(0,0,0,.7)',
    },
    headerTitleStyle: {
      color: '#fff',
    },

    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-star' : 'ios-star-outline'}
        size={30}
        color={focused ? '#c32b2b' : '#fff'}
      />
    ),
  }
  render() {
    return (
      <View>
        <RatingsList />
      </View>
    )
  }
}

export default Ratings
