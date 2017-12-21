import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native'

import { compose, graphql } from 'react-apollo'

import movieQuery from '../query/movie'

import MovieHeader from '../components/MovieHeader'
import MovieDescription from '../components/MovieDescription'
import MovieMedia from '../components/MovieMedia'
import ImageScroller from '../components/ImageScroller'

import colors from '../constants/colors'
import font from '../constants/fontFamily'

class MovieDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: null,
    headerStyle: {
      backgroundColor: colors.black,
      paddingTop: 10,
      marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: colors.white,
      fontSize: 18,
      fontFamily: font.regular,
    },
    headerBackTitleStyle: {
      color: colors.white,
    },
  })
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    const { loading, movie } = this.props.data
    return (
      <ScrollView style={styles.page}>
        {loading && (
          <Text style={{ color: colors.white, fontFamily: font.thin }}>
            Loading...
          </Text>
        )}
        {movie && (
          <View>
            <MovieHeader
              title={movie.title}
              backdrop={movie.backdrop_path}
              genres={movie.genres}
              releaseDate={movie.release_date}
              length={movie.runtime}
              rating={movie.vote_average}
              totalReviews={movie.vote_count}
              tagline={movie.tagline}
            />
            <MovieDescription overview={movie.overview} />
            <MovieMedia
              images={movie.images.backdrops.reverse()}
              cast={movie.credits.cast}
            />
            <ImageScroller
              title="Recommended Movies"
              onPress={id =>
                this.props.navigation.navigate('MovieDetail', { id })}
              recs={movie.recommendations.results}
            />
          </View>
        )}
      </ScrollView>
    )
  }
}

const withApollo = component =>
  graphql(movieQuery, {
    options: ({ navigation }) => {
      return {
        variables: {
          id: String(navigation.state.params.id),
        },
      }
    },
  })(component)

export default compose(withApollo)(MovieDetail)

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.black,
    flex: 1,
  },
})
