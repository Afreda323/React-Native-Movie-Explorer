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
    videos: PropTypes.array.isRequired,
    cast: PropTypes.array.isRequired,
  }
  static defaultProps = {
    images: [],
    cast: [],
  }
  state = {
    imageEnd: 4,
    images: this.props.images.slice(0, 4),
    videoEnd: 4,
    videos: this.props.videos.slice(0, 4),
    castEnd: 3,
    cast: this.props.cast.slice(0, 3),
  }
  addVideos = () => {
    this.setState({ videoEnd: this.state.videoEnd + 4 }, () =>
      this.setState({ videos: this.props.videos.slice(0, this.state.videoEnd) })
    )
  }
  addImages = () => {
    this.setState({ imageEnd: this.state.imageEnd + 4 }, () =>
      this.setState({ images: this.props.images.slice(0, this.state.imageEnd) })
    )
  }
  addCast = () => {
    this.setState({ castEnd: this.state.castEnd + 3 }, () =>
      this.setState({ cast: this.props.cast.slice(0, this.state.castEnd) })
    )
  }
  render() {
    return (
      <View>
        {this.state.videos.length >= this.props.videos.length ? null : (
          <TouchableOpacity style={styles.button} onPress={this.addVideos}>
            <Text style={styles.buttonText}>Load more videos</Text>
            <Ionicons
              name={'ios-videocam-outline'}
              size={25}
              color={colors.mediumRed}
            />
          </TouchableOpacity>
        )}
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
            <View
              key={image.file_path}
              style={{
                width: width / 2 - 4,
                height: width / 2 / 1.777777777777778,
              }}>
              <Image
                resizeMethod="resize"
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
              color={colors.mediumRed}
            />
          </TouchableOpacity>
        )}
        <View style={{ backgroundColor: colors.white }}>
          <Text style={styles.titleAlt}>Cast Members</Text>
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
          <ImageList cast castMembers={this.state.cast} />
          {this.state.cast.length >= this.props.cast.length ? null : (
            <TouchableOpacity style={styles.buttonAlt} onPress={this.addCast}>
              <Text style={styles.buttonTextAlt}>Load more people</Text>
              <Ionicons
                name={'ios-people-outline'}
                size={25}
                color={colors.mediumRed}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }
}

export default MovieMedia

const styles = StyleSheet.create({
  imageCont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  videoCont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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
  buttonAlt: {
    backgroundColor: colors.white,
    padding: 13,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonTextAlt: {
    color: colors.black,
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
  titleAlt: {
    color: colors.black,
    fontFamily: font.regular,
    fontSize: 22,
    marginHorizontal: 20,
    marginTop: 8,
  },
})


// <Text style={styles.title}>Videos</Text>
//         <View
//           style={{
//             backgroundColor: colors.mediumRed,
//             height: 2,
//             width: 50,
//             marginTop: 5,
//             marginBottom: 8,
//             marginHorizontal: 20,
//           }}
//         />
//         <View style={styles.videoCont}>
//           {this.state.videos.map(video => (
//             <View
//               key={video.key}
//               style={{
//                 width: width / 2 - 4,
//                 height: width / 2 / 1.777777777777778,
//               }}>
//               <Image
//                 resizeMethod="resize"
//                 resizeMode="contain"
//                 style={{ width: '100%', height: '100%' }}
//                 source={{ uri: `https://img.youtube.com/vi/${video.key}a/maxresdefault.jpg` }}
//               />
//             </View>
//           ))}
//         </View>