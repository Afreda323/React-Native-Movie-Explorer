import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StatusBar, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

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
    StatusBar.setBarStyle("light-content", true)
  }
  render() {
    return (
      <View style={styles.page}>
        <Searchbar />
        <SearchResults />
      </View>
    )
  }
}

export default Search

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.black,
    flex: 1,
  }
})
