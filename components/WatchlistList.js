import React, { Component } from 'react'
import { View } from 'react-native'

import WatchlistItem from './WatchlistItem'

class WatchlistList extends Component {
  render() {
    return (
      <View>
        <WatchlistItem />
      </View>
    )
  }
}

export default WatchlistList
