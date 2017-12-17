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
import font from '../constants/fontFamily'

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
      <View style={styles.listWarp}>
      <ScrollView contentContainerStyle={styles.wrap} horizontal={true}>
        {this.renderItems()}
      </ScrollView>
      </View>
    )
  }
}

export default FilterList

const styles = StyleSheet.create({
  listWarp: {

    backgroundColor: colors.black,
  },
  wrap: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '100%',
    paddingHorizontal: 15

  },
  filter: {
    color: colors.white,
    paddingBottom: 8,
    fontSize: 15,
    fontFamily: font.thin,
  },
  textWrap: {
    marginTop: 8,
    marginBottom: 12,
    marginHorizontal: 15,
  },
  activeTextWrap: {
    borderBottomWidth: 2,
    borderBottomColor: colors.mediumRed,
  },
})
