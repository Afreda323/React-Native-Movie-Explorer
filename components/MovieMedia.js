import React, { Component } from 'react'
import { View } from 'react-native'

import ImageList from 'ImageList'
import VideoList from 'VideoList'
import FilterList from 'FilterList'

class MovieMedia extends Component {
  render() {
    return (
      <View>
        <FilterList />
        <VideoList />
        <ImageList />
      </View>
    )
  }
}

export default MovieMedia
