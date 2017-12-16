import React, { Component } from 'react'
import { View } from 'react-native'

import MovieHeader from '../components/MovieHeader'
import MovieDescription from '../components/MovieDescription'
import MovieMedia from '../components/MovieMedia'
import ImageScroller from '../components/ImageScroller'

class MovieDetail extends Component {
  render() {
    return (
      <View>
        <MovieHeader />
        <MovieDescription />
        <MovieMedia />
        <ImageScroller />
      </View>
    )
  }
}

export default MovieDetail
