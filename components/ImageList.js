import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Image from './Image'

class ImageList extends Component {
  static propTypes = {
    filter: PropTypes.string,
    onScrollBottom: PropTypes.func,
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        poster_path: PropTypes.string,
      })
    ),
  }
  static defaultProps = {
    movies: [],
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.filter !== nextProps.filter) {
      this.scroll.scrollWithoutAnimationTo(0)
    }
  }

  onScroll = e => {
    let paddingBottom = 10
    // Add the scroll height to a 10px padding
    paddingBottom += e.nativeEvent.layoutMeasurement.height
    // If offset is greater than padding height
    // fire scroll bottom prop
    if (
      e.nativeEvent.contentOffset.y >=
      e.nativeEvent.contentSize.height - paddingBottom
    ) {
      this.props.onScrollBottom()
    }
  }

  renderMovies = () => {
    return this.props.movies.map((movie, i) => (
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
      <ScrollView
        ref={scroll => (this.scroll = scroll)}
        contentContainerStyle={styles.scroll}
        onScroll={this.props.onScrollBottom && this.onScroll}>
        {this.renderMovies()}
      </ScrollView>
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
})
export default ImageList
