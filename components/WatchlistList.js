import React, { Component } from 'react'
import { ScrollView } from 'react-native'

import SearchResult from './SearchResult'

class WatchlistList extends Component {
  renderList = watched =>
    this.props[watched ? 'watched' : 'notWatched']
      .sort((a, b) => a.title > b.title)
      .map(movie => (
        <SearchResult
          result={movie}
          onClick={this.props.onSelect}
          onWatched={watched ? null : this.props.onWatched }
          onNotWatched={watched ?this.props.onNotWatched : null }
        />
      ))
  render() {
    return this.props.active === 'Watched' ? (
      <ScrollView>{this.renderList(true)}</ScrollView>
    ) : (
      <ScrollView>{this.renderList()}</ScrollView>
    )
  }
}

export default WatchlistList
