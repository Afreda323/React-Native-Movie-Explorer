import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Picker,
  StyleSheet,
  TouchableOpacity,
  Text,
  Slider,
} from 'react-native'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import colors from '../constants/colors'
import font from '../constants/fontFamily'

const SORT_TYPES = [
  { name: 'Popularity Descening', value: 'popularity.desc' },
  { name: 'Popularity Ascending', value: 'popularity.asc' },
  { name: 'Release Date Descending', value: 'primary_release_date.desc' },
  { name: 'Release Date Ascending', value: 'primary_release_date.asc' },
  { name: 'Revenue Descending', value: 'revenue.desc' },
  { name: 'Revenue Ascending', value: 'revenue.asc' },
  { name: 'Title Descending', value: 'original_title.desc' },
  { name: 'Title Ascending', value: 'original_title.asc' },
  { name: 'Rating Ascending', value: 'vote_average.desc' },
  { name: 'Rating Ascending', value: 'vote_average.asc' },
  { name: 'Total Votes Ascending', value: 'vote_count.asc' },
  { name: 'Total Votes Descending', value: 'vote_count.desc' },
]
const YEARS = range(new Date().getFullYear(), 1900)

class FilterModal extends Component {
  static propTypes = {
    year: PropTypes.number,
    onSelectYear: PropTypes.func,
    sortType: PropTypes.string,
    onSelectSort: PropTypes.func,
    minRating: PropTypes.number,
    onMinRatingChange: PropTypes.func,
  }
  render() {
    return (
      <View>
        <View style={{ height: 100 }}>
          <ScrollView>
            {YEARS.map(year => (
              <TouchableOpacity
                key={year}
                onPress={() => this.props.onSelectYear(year)}>
                <Text
                  style={[
                    styles.item,
                    this.props.year === year && styles.active,
                  ]}>
                  {year}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{ height: 100 }}>
          <ScrollView>
            {SORT_TYPES.map(sort => (
              <TouchableOpacity
                key={sort.value}
                onPress={() => this.props.onSelectSort(sort.value)}>
                <Text
                  style={[
                    styles.item,
                    this.props.sortType === sort.value && styles.active,
                  ]}>
                  {sort.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor={colors.darkRed}
          maximumTrackTintColor={colors.mediumRed}
          thumbTintColor={colors.lightRed}
          step={0.5}
          value={this.props.minRating}
          onSlidingComplete={this.props.onMinRatingChange}
        />
        <Text style={styles.min}>{this.props.minRating}</Text>
      </View>
    )
  }
}

export default FilterModal

const styles = StyleSheet.create({
  picker: {
    height: 100,
  },
  item: {
    fontFamily: font.thin,
    backgroundColor: colors.black,
    color: colors.white,
    fontSize: 16,
  },
  active: {
    color: colors.mediumRed,
  },
  min: {
    color: colors.white,
  },
})
