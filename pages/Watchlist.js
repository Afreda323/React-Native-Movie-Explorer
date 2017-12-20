import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import WatchlistList from '../components/WatchlistList'

import colors from '../constants/colors'
import font from '../constants/fontFamily'

class Watchlist extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Watchlist',
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
        name={focused ? 'ios-list-box' : 'ios-list-box-outline'}
        size={30}
        color={focused ? colors.mediumRed : colors.white}
      />
    ),
  })
  render() {
    return (
      <View>
        <WatchlistList />
      </View>
    )
  }
}

export default Watchlist
