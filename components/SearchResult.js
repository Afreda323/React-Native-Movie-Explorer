import React, { Component } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from 'react-native'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'

import colors from '../constants/colors'
import font from '../constants/fontFamily'

const PATH = 'http://image.tmdb.org/t/p/original'
const { width } = Dimensions.get('window')

class SearchResult extends Component {
  static propTypes = {
    result: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      poster_path: PropTypes.string,
      backdrop_path: PropTypes.string,
      vote_average: PropTypes.number,
      vote_count: PropTypes.number,
      overview: PropTypes.string,
    }),
    onClick: PropTypes.func,
    onWatched: PropTypes.func,
    onNotWatched: PropTypes.func,
  }
  state = {
    imageOpacity: new Animated.Value(0),
    backOpacity: new Animated.Value(0),
  }
  onLoadImage() {
    Animated.timing(this.state.imageOpacity, {
      toValue: 1,
      duration: 250,
    }).start()
  }
  onLoadBack() {
    Animated.timing(this.state.backOpacity, {
      toValue: 0.25,
      duration: 1000,
    }).start()
  }
  trimOverview = str => (str.length > 100 ? str.substr(0, 97) + '...' : str)
  render() {
    const {
      title,
      overview,
      vote_average,
      vote_count,
      poster_path,
      backdrop_path,
      id,
    } = this.props.result
    const { onWatched, onNotWatched } = this.props
    return (
      <TouchableOpacity onPress={() => this.props.onClick(id)}>
        <Animated.Image
          onLoad={() => this.onLoadBack()}
          style={[styles.backdrop, { opacity: this.state.backOpacity }]}
          source={{ uri: `${PATH}${backdrop_path}` }}
          resizeMode="cover"
        />
        <View style={styles.result}>
          <Animated.Image
            onLoad={() => this.onLoadImage()}
            style={[styles.img, { opacity: this.state.imageOpacity }]}
            source={{ uri: `${PATH}${poster_path}` }}
          />
          <View style={styles.textWrap}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.overview}>{this.trimOverview(overview)}</Text>
            <View style={styles.ratingWrap}>
              <Text style={styles.rating}>{vote_average}</Text>
              <Text style={styles.count}>{vote_count} Ratings</Text>
            </View>
            {onNotWatched ? (
              <TouchableOpacity
                style={{ paddingVertical: 10, marginTop: -7 }}
                onPress={() => onNotWatched(id)}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Mark as not watched</Text>
                </View>
              </TouchableOpacity>
            ) : null}
            {onWatched ? (
              <TouchableOpacity
                style={{ paddingVertical: 10, marginTop: -7 }}
                onPress={() => onWatched(id)}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Mark as watched</Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.mediumRed,
    borderRadius: 40,
    marginHorizontal: 8,
    paddingHorizontal: 10,
    zIndex: 100,
  },
  buttonText: {
    fontFamily: font.thin,
    color: colors.white,
    padding: 5,
    backgroundColor: 'transparent',
    fontSize: 16,
  },
  result: {
    width: '100%',
    flexDirection: 'row',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
  },
  title: {
    color: colors.white,
    fontFamily: font.bold,
    fontSize: 20,
    backgroundColor: 'transparent',
  },
  rating: {
    color: colors.white,
    fontFamily: font.bold,
    marginRight: 10,
    fontSize: 22,
    backgroundColor: 'transparent',
  },
  textWrap: {
    width: width / 4 * 3,
    height: width / 4 * 3 / 2,
    justifyContent: 'center',
    padding: 10,
  },
  count: {
    color: colors.white,
    fontFamily: font.thin,
    backgroundColor: 'transparent',
  },
  overview: {
    color: colors.white,
    fontFamily: font.thin,
    backgroundColor: 'transparent',
  },
  img: {
    width: width / 4,
    height: width / 4 * 3 / 2,
    opacity: 0,
  },
  ratingWrap: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backdrop: {
    width: width / 4 * 3,
    height: width / 4 * 3 / 2,
    marginLeft: width / 4,
    opacity: 0,
    position: 'relative',
    zIndex: 0,
  },
})

export default SearchResult
