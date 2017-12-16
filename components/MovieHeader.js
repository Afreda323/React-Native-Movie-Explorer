import React, { Component } from 'react'
import { View } from 'react-native'

import RatingCircle from './RatingCircle'

class MovieHeader extends Component {
  render() {
    return (
      <View>
        <RatingCircle />
      </View>
    )
  }
}

export default MovieHeader
