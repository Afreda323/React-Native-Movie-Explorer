import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
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
        vote_count: PropTypes.number,
        overview: PropTypes.string,
      })
    ),
  }
  renderResults = () => {
    return this.props.results.map(result => (
      <SearchResult onClick={id => this.props.onClick(id)} key={result.id} result={result} />
    ))
  }
  render() {
    return <ScrollView style={{marginTop: -30}}>{this.renderResults()}</ScrollView>
  }
}

export default SearchResults
