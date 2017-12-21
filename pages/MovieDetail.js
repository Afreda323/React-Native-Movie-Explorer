import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'

import movieQuery from '../query/movie'
import { addMovie, removeMovie } from '../actions/watchlist.actions'

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
    headerLeft: () => (
      <TouchableOpacity
        style={{
          paddingHorizontal: 5,
          alignItems: 'center',
          flexDirection: 'row',
        }}
        onPress={() => navigation.goBack()}>
        <Ionicons
          name={'ios-arrow-dropleft-outline'}
          size={30}
          color={'#fff'}
        />
        <Text
          style={{
            fontFamily: font.thin,
            color: colors.white,
            paddingLeft: 5,
            fontSize: 15,
          }}>
          Go back
        </Text>
      </TouchableOpacity>
    ),
  })
  addMovie = () => {
    this.props.addMovie(this.props.data.movie)
  }
  removeMovie = () => {
    this.props.removeMovie(this.props.data.movie)
  }
  render() {
    const { watched, notWatched } = this.props
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
              added={
                watched.concat(notWatched).filter(mov => mov.id === movie.id)
                  .length > 0
              }
              onAdd={this.addMovie}
              onRemove={this.removeMovie}
            />
            <MovieDescription overview={movie.overview} />
            {movie.images && (
              <MovieMedia
                images={movie.images.backdrops.reverse()}
                cast={movie.credits.cast}
              />
            )}
            {movie.recommendations && (
              <ImageScroller
                title="Recommended Movies"
                onPress={id =>
                  this.props.navigation.navigate('MovieDetail', { id })}
                recs={movie.recommendations.results}
              />
            )}
          </View>
        )}
      </ScrollView>
    )
  }
}

const mstp = ({ watchlist: { watched, notWatched } }) => ({
  watched,
  notWatched,
})
const withRedux = component =>
  connect(mstp, { addMovie, removeMovie })(component)

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

export default compose(withRedux, withApollo)(MovieDetail)

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.black,
    flex: 1,
  },
})
