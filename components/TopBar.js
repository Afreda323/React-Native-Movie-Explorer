import React, { Component } from 'react'
import { View } from 'react-native'
import FilterList from './FilterList'

class TopBar extends Component {
  render() {
    return (
      <View>
        <FilterList />
      </View>
    )
  }
}

export default TopBar
