import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

import ImageList from './ImageList'
import VideoList from './VideoList'
import FilterList from './FilterList'

import font from '../constants/fontFamily'
import colors from '../constants/colors'

const { width } = Dimensions.get('window')
const PATH = 'http://image.tmdb.org/t/p/original'

class MovieMedia extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    cast: PropTypes.array.isRequired,
  }
  static defaultProps = {
    images: [],
    cast: []
  }
  state = {
    imageEnd: 4,
    images: this.props.images.slice(0, 4),
  }
  addImages = () => {
    this.setState({ imageEnd: this.state.imageEnd + 4 }, () =>
      this.setState({ images: this.props.images.slice(0, this.state.imageEnd) })
    )
  }
  render() {
    return (
      <View>
        <Text style={styles.title}>Images</Text>
        <View
          style={{
            backgroundColor: colors.mediumRed,
            height: 2,
            width: 50,
            marginTop: 5,
            marginBottom: 8,
            marginHorizontal: 20,
          }}
        />
        <View style={styles.imageCont}>
          {this.state.images.map(image => (
            <View style={{ width: width / 2, height: width / 2 / 1.7 }}>
              <Image
                resizeMode="contain"
                style={{ width: '100%', height: '100%' }}
                source={{ uri: `${PATH}${image.file_path}` }}
              />
            </View>
          ))}
        </View>
        {this.state.images.length >= this.props.images.length ? null : (
          <TouchableOpacity style={styles.button} onPress={this.addImages}>
            <Text style={styles.buttonText}>Load more images</Text>
            <Ionicons
              name={'ios-images-outline'}
              size={25}
              color={colors.white}
            />
          </TouchableOpacity>
        )}
        <VideoList />
        <ImageList cast castMembers={this.props.cast} />
      </View>
    )
  }
}

export default MovieMedia

const styles = StyleSheet.create({
  imageCont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: colors.black,
    padding: 13,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontFamily: font.thin,
    fontSize: 20,
    marginRight: 4,
  },
  title: {
    color: colors.white,
    fontFamily: font.regular,
    fontSize: 22,
    marginHorizontal: 20,
    marginTop: 8,
  },
})
