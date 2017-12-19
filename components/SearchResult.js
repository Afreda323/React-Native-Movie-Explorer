import React, { Component } from 'react'
import { View, Text } from 'react-native'

class SearchResult extends Component {
  render() {
    return <Text>{this.props.result.title}</Text>
  }
}

export default SearchResult