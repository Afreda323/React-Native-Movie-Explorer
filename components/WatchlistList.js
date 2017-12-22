import React, { Component } from 'react'
import { ScrollView } from 'react-native'

import SearchResult from './SearchResult'

class WatchlistList extends Component {
  renderWatched = () =>
    this.props.watched.map(movie => (
      <SearchResult
        result={movie}
        onClick={this.props.onSelect}
        onNotWatched={this.props.onNotWatched}
      />
    ))
  renderNotWatched = () =>
    this.props.notWatched.map(movie => (
      <SearchResult
        result={movie}
        onClick={this.props.onSelect}
        onWatched={this.props.onWatched}
      />
    ))
  render() {
    return this.props.active === 'Watched' ? (
      <ScrollView>{this.renderWatched()}</ScrollView>
    ) : (
      <ScrollView>{this.renderNotWatched()}</ScrollView>
    )
  }
}

export default WatchlistList
