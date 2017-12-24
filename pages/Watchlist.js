import React, { Component } from 'react'
import { View, Platform, StyleSheet, ScrollView, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'

import * as actions from '../actions/watchlist.actions'

import FilterList from '../components/FilterList'
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
      alignSelf: 'center'
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
    const {
      watched,
      notWatched,
      active,
      toggleActive,
      makeNotWatched,
      makeWatched,
      navigation
    } = this.props
    return (
      <View style={styles.page}>
        <FilterList
          active={active}
          filters={['Not Watched', 'Watched']}
          onPress={val => toggleActive(val)}
          even
        />
        <ScrollView>
        <WatchlistList
          active={active}
          watched={watched}
          notWatched={notWatched}
          onWatched={makeWatched}
          onNotWatched={makeNotWatched}
          onSelect={id => navigation.navigate('MovieDetail', { id })}
        />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({ watchlist: { watched, notWatched, active } }) => ({
  watched,
  notWatched,
  active,
})
export default connect(mapStateToProps, actions)(Watchlist)

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.black,
    flex: 1,
  },
})
