import React, { Component } from 'react'
import { View } from 'react-native'

import Searchbar from '../components/Searchbar'
import SearchResults from '../components/SearchResults'

class Search extends Component {
  render() {
    return (
      <View>
        <Searchbar />
        <SearchResults />
      </View>
    )
  }
}

export default Search
