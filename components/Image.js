import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native'
import PropTypes from 'prop-types'

const PATH = 'http://image.tmdb.org/t/p/original'
const { width } = Dimensions.get('window')

class Img extends Component {
  static propTypes = {
    imgPath: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    offset: PropTypes.bool,
  }
  state = {
    imageOpacity: new Animated.Value(0),
  }
  onLoadImage() {
    Animated.timing(this.state.imageOpacity, {
      toValue: 1,
      duration: 250,
    }).start()
  }
  render() {
    const { onClick, imgPath, id, offset } = this.props
    return (
      <TouchableOpacity style={styles.touch} onPress={() => onClick(id)}>
        <Animated.Image
          onLoad={() => this.onLoadImage()}
          style={[
            styles.img,
            offset && styles.offset,
            { opacity: this.state.imageOpacity },
          ]}
          source={{ uri: `${PATH}${imgPath}` }}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  touch: {
    width: '49%',
    position: 'relative',
  },
  offset: {
    marginTop: -(width / 2 * 3 / 2 / 2),
  },
  img: {
    width: '100%',
    height: width / 2 * 3 / 2,
    margin: 4,
    opacity: 0,
  },
})
export default Img
