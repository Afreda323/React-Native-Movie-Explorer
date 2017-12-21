import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native'
import PropTypes from 'prop-types'
import Image from './Image'

const { width } = Dimensions.get('window')
const OFFSET = width / 2 * 3 / 2 / 2

class ImageList extends Component {
  static propTypes = {
    cast: PropTypes.bool,
    filter: PropTypes.string,
    onLoadMore: PropTypes.func,
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        poster_path: PropTypes.string,
      })
    ),
    castMembers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        profile_path: PropTypes.string,
      })
    ),
  }
  static defaultProps = {
    movies: [],
  }
  componentDidMount() {
    this.scroll.scrollTo(0)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.filter !== nextProps.filter) {
      this.scroll.scrollTo(0)
    }
  }

  onScroll = e => {
    // let paddingBottom = 10
    // // Add the scroll height to a 10px padding
    // paddingBottom += e.nativeEvent.layoutMeasurement.height
    // // If offset is greater than padding height
    // // fire scroll bottom prop
    // if (
    //   e.nativeEvent.contentOffset.y >=
    //   e.nativeEvent.contentSize.height - paddingBottom
    // ) {
    //   this.props.onScrollBottom()
    // }
  }

  renderMovies = () => {
    this.props.cast
      ? this.props.castMembers.map((person, i) => (
          <Image
            offset={i % 2 === 0}
            key={person.name}
            imgPath={person.profile_path}
          />
        ))
      : this.props.movies.map((movie, i) => (
          <Image
            offset={i % 2 === 0}
            key={movie.id}
            onClick={id => this.props.onClick(id)}
            id={movie.id}
            imgPath={movie.poster_path}
          />
        ))
  }
  render() {
    return (
      <View>
        <ScrollView
          ref={scroll => (this.scroll = scroll)}
          contentContainerStyle={styles.scroll}
          onScroll={this.props.onScrollBottom && this.onScroll}>
          {this.renderMovies()}
          {this.props.onLoadMore && (
            <TouchableOpacity
              onPress={this.props.onLoadMore}
              style={styles.button}>
              <Text style={styles.buttonText}>Load More</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f0f0f',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
})
export default ImageList
