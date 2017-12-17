import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StatusBar, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

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
    StatusBar.setBarStyle("light-content", true)
  }
  handleFilter = filter => {
    this.setState({ activeFilter: filter })
  }
  render() {
    return (
      <View style={styles.page}>
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

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.black,
    flex: 1,
  }
})
