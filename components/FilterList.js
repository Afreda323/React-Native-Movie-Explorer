import React, { Component } from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'

import colors from '../constants/colors'

class FilterList extends Component {
  static propTypes = {
    filters: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    active: PropTypes.string.isRequired,
  }
  renderItems = () =>
    this.props.filters.map(filter => (
      <TouchableOpacity key={filter} onPress={() => this.props.onPress(filter)}>
        <View
          style={[
            styles.textWrap,
            filter === this.props.active && styles.activeTextWrap,
          ]}>
          <Text style={styles.filter}>{filter}</Text>
        </View>
      </TouchableOpacity>
    ))

  render() {
    return (
      <ScrollView contentContainerStyle={styles.wrap} horizontal={true}>
        {this.renderItems()}
      </ScrollView>
    )
  }
}

export default FilterList

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    backgroundColor: colors.black,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: '100%'
  },
  filter: {
    color: colors.white,
    paddingVertical: 5,
    fontSize: 14
  },
  textWrap: {
    marginVertical: 8,
    marginHorizontal: 15,
  },
  activeTextWrap: {
    borderBottomWidth: 2,
    borderBottomColor: colors.mediumRed,
  },
})
