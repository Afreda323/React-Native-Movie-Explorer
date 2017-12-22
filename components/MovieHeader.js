import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'
import { LinearGradient } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'

import colors from '../constants/colors'
import font from '../constants/fontFamily'

const PATH = 'http://image.tmdb.org/t/p/original'
const { width } = Dimensions.get('window')

class MovieHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    backdrop: PropTypes.string,
    genres: PropTypes.array,
    releaseDate: PropTypes.string,
    tagline: PropTypes.string,
    length: PropTypes.number,
    rating: PropTypes.number,
    totalReviews: PropTypes.number,
    added: PropTypes.bool,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
  }
  state = {
    backOpacity: new Animated.Value(0),
  }
  onLoadBack() {
    Animated.timing(this.state.backOpacity, {
      toValue: 1,
      duration: 250,
    }).start()
  }
  renderGenres = genres => (
    <ScrollView
      horizontal
      style={{
        paddingHorizontal: 15,
      }}>
      <Text style={styles.genres}>
        <Ionicons
          name={'ios-list-box-outline'}
          size={20}
          color={colors.white}
        />{' '}
        {genres.map(({ name }) => name + ', ')}
      </Text>
    </ScrollView>
  )
  renderTitle = title =>
    title.split(': ').map(sub => <Text key={sub} style={styles.title}>{sub}</Text>)
  convertTime = time => {
    const times = moment
      .utc()
      .startOf('day')
      .add(time, 'minutes')
      .format('hh:mm')
      .split(':')
    const hours = times[0] == 12 ? '0' : String(parseInt(times[0]))
    const minutes = String(parseInt(times[1]))
    return `${hours}h${minutes}m`
  }
  render() {
    const {
      title,
      backdrop,
      genres,
      releaseDate,
      length,
      rating,
      totalReviews,
      tagline,
      added,
      onAdd,
      onRemove
    } = this.props
    return (
      <View>
        <LinearGradient
          colors={['transparent', colors.black]}
          style={styles.gradient}
        />
        <Animated.Image
          resizeMethod="resize"
          onLoad={() => this.onLoadBack()}
          style={[styles.backdrop, { opacity: this.state.backOpacity }]}
          source={{ uri: `${PATH}${backdrop}` }}
          resizeMode="contain"
        />
        <View style={styles.textWrap}>
          {this.renderTitle(title)}
          <Text style={styles.subtitle}>{tagline}</Text>
          <View style={styles.hr} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingHorizontal: 15,
            }}>
            <Text style={styles.releaseDate}>
              <Ionicons
                name={'ios-calendar-outline'}
                size={20}
                color={colors.white}
              />{' '}
              {moment(releaseDate).format('MMMM Do YYYY')}
            </Text>
            <Text style={styles.releaseDate}>
              <Ionicons
                name={'ios-time-outline'}
                size={20}
                color={colors.white}
              />{' '}
              {this.convertTime(length)}
            </Text>
          </View>
          {this.renderGenres(genres)}
          <Text style={styles.rating}>
            <Ionicons
              name={'ios-star-outline'}
              size={20}
              color={colors.white}
            />{' '}
            {rating}/10 from {totalReviews} reviews.
          </Text>
          {added ? (
            <TouchableOpacity style={styles.button} onPress={onRemove}>
              <Text style={styles.watchlist}>Remove from watchlist</Text>
              <Ionicons
                name={'ios-remove-circle-outline'}
                size={20}
                color={colors.white}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={onAdd}>
              <Text style={styles.watchlist}>Add to watchlist</Text>
              <Ionicons
                name={'ios-add-circle-outline'}
                size={20}
                color={colors.white}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }
}

export default MovieHeader

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.mediumRed,
    borderRadius: 40,
    marginHorizontal: 50,
    marginTop: 10,
  },
  watchlist: {
    fontFamily: font.thin,
    color: colors.white,
    fontSize: 20,
    padding: 5,
  },
  backdrop: {
    width: width + 50,
    height: (width + 50) * (1 / 1.7),
    marginLeft: -25,
  },
  hr: {
    backgroundColor: colors.mediumRed,
    height: 2,
    width: 50,
    marginTop: 5,
    marginBottom: 8,
    marginHorizontal: 20,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    zIndex: 3,
    width: width,
    top: (width + 50) * (1 / 1.7) / 2,
    height: (width + 50) * (1 / 1.7) / 2,
  },
  textWrap: {
    marginTop: -50,
    zIndex: 5,
    paddingBottom: 20,
  },
  title: {
    color: colors.white,
    fontFamily: font.bold,
    fontSize: 50,
    backgroundColor: 'transparent',
    lineHeight: 50,
    paddingHorizontal: 20,
  },
  subtitle: {
    color: colors.white,
    fontFamily: font.regular,
    fontSize: 30,
    backgroundColor: 'transparent',
    lineHeight: 30,
    paddingHorizontal: 20,
    opacity: .8
  },
  releaseDate: {
    color: colors.white,
    fontFamily: font.regular,
    fontSize: 20,
    backgroundColor: 'transparent',
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rating: {
    color: colors.white,
    fontFamily: font.regular,
    fontSize: 20,
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genres: {
    marginTop: 3,
    color: colors.white,
    fontFamily: font.thin,
    fontSize: 18,
    backgroundColor: 'transparent',
    marginHorizontal: 5,
    alignItems: 'center',
  },
})
