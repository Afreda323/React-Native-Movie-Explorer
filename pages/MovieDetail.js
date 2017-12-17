import React, { Component } from 'react'
import { View, Text } from 'react-native'

import MovieHeader from '../components/MovieHeader'
import MovieDescription from '../components/MovieDescription'
import MovieMedia from '../components/MovieMedia'
import ImageScroller from '../components/ImageScroller'

class MovieDetail extends Component {
  render() {
    return (
      <View>
        <Text>Movie Detail</Text>
        <MovieHeader />
        <MovieDescription />
        <MovieMedia />
        <ImageScroller />
      </View>
    )
  }
}

export default MovieDetail
