import React, { Component } from 'react'
import { ListView, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import SearchResult from './SearchResult'

class SearchResults extends Component {
  static propTypes = {
    results: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        poster_path: PropTypes.string,
        vote_average: PropTypes.number,
      })
    ),
  }
  renderResults = () => {
    return this.props.results.map(result => (
      <SearchResult key={result.id} result={result} />
    ))
  }
  render() {
    if (this.props.results && this.props.results.length > 0) {
      return (
        <View>
          {this.renderResults()}
        </View>
      )
    } else {
      return <View />
    }
  }
}

export default SearchResults
