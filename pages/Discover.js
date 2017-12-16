import React, { Component } from 'react'
import { View } from 'react-native'

import ImageList from '../components/ImageList'
import FilterModal from '../components/FilterModal'

class Discover extends Component {
  render() {
    return (
      <View>
        <FilterModal />
        <ImageList />
      </View>
    )
  }
}

export default Discover
