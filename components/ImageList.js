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

import colors from '../constants/colors'
import font from '../constants/fontFamily'

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
    if (!this.props.cast) {
      this.scroll.scrollTo({ x: 0, y: 0, animated: true })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.filter !== nextProps.filter) {
      this.scroll.scrollTo({ x: 0, y: 0, animated: true })
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
  renderCast = () =>
    this.props.castMembers.map(person => (
      <Image
        third
        key={person.name}
        imgPath={person.profile_path}
        name={person.name}
      />
    ))

  renderMovies = () =>
    this.props.movies.map((movie, i) => (
      <Image
        offset={i % 2 === 0}
        key={movie.id}
        onClick={id => this.props.onClick(id)}
        id={movie.id}
        imgPath={movie.poster_path}
      />
    ))

  render() {
    return (
      <View>
        {this.props.cast ? (
          <View style={styles.scroll}>{this.renderCast()}</View>
        ) : (
          <ScrollView
            ref={scroll => (this.scroll = scroll)}
            contentContainerStyle={styles.scroll}
            onScroll={this.props.onScrollBottom && this.onScroll}>
            {this.renderMovies()}
            {this.props.onLoadMore && (
              <TouchableOpacity
                onPress={this.props.onLoadMore}
                style={[styles.button, styles.offset]}>
                <Text style={styles.buttonText}>Load More</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        )}
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
    width: width / 2,
    height: width / 2 * 3 / 5,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f0f0f',
  },
  offset: {
    marginTop: -OFFSET,
  },
  buttonText: {
    fontSize: 26,
    color: colors.white,
    fontFamily: font.thin,
  },
})
export default ImageList
