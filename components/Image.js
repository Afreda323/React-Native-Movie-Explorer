import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'

import colors from '../constants/colors'
import font from '../constants/fontFamily'

const PATH = 'http://image.tmdb.org/t/p/original'
const { width } = Dimensions.get('window')
const OFFSET = width / 2 * (3 / 2) / 2

class Img extends Component {
  static propTypes = {
    imgPath: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    offset: PropTypes.bool,
    third: PropTypes.bool,
    horizontal: PropTypes.bool,
    name: PropTypes.string,
  }
  state = {
    imageOpacity: new Animated.Value(0),
    name: false,
  }
  onLoadImage() {
    Animated.timing(this.state.imageOpacity, {
      toValue: 1,
      duration: 250,
    }).start()
    this.setState({ loaded: true })
  }
  render() {
    const { onClick, imgPath, id, offset, third, name, horizontal } = this.props
    return (
      <TouchableOpacity
        style={
          horizontal ? styles.horizontal : third ? styles.third : styles.touch
        }
        onPress={() =>
          name ? this.setState({ name: !this.state.name }) : onClick(id)}>
        <Animated.Image
          onLoad={() => this.onLoadImage()}
          style={[
            horizontal ? styles.horizImg : third ? styles.thirdImg : styles.img,
            offset && styles.offset,
            { opacity: this.state.imageOpacity },
          ]}
          source={{ uri: `${PATH}${imgPath}` }}
        />
        {name && this.state.name && <Text style={styles.text}>{name}</Text>}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  touch: {
    width: '49%',
    position: 'relative',
  },
  third: {
    width: width / 3 - 2,
    position: 'relative',
  },
  horizontal: {
    width: width / 3.3 - 2,
    position: 'relative',
  },
  offset: {
    marginTop: -OFFSET,
  },
  img: {
    width: '100%',
    height: width / 2 * (3 / 2),
    margin: 4,
    opacity: 0,
  },
  thirdImg: {
    width: '100%',
    height: width / 3 * (3 / 2),
    margin: 1,
    opacity: 0,
  },
  horizImg: {
    width: '100%',
    height: width / 3.3 * (3 / 2),
    margin: 1,
    opacity: 0,
  },
  text: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    fontFamily: font.thin,
    color: colors.black,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
  },
})
export default Img
