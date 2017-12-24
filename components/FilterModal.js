import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Picker,
  StyleSheet,
  TouchableOpacity,
  Text,
  Slider,
  Animated,
  Modal,
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
  state = {
    active: false,
  }
  renderName = (value, arr) => arr.filter(el => el.value === value)[0].name
  closeFilters = () => {
    this.setState({ active: false })
  }
  showFilters = () => {
    this.setState({ active: true })
  }
  render() {
    return (
      <View>
        <Modal
          visible={this.state.active}
          transparent
          animationType="slide"
          onRequestClose={this.closeFilters}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,.9)',
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: colors.black,
                paddingVertical: 20,
              }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.buttonText}>Filters</Text>
              </View>
              <View
                style={{
                  height: 175,
                  marginBottom: 10,
                }}>
                <Text style={styles.label}>
                  Release Year:{' '}
                  <Text style={{ fontSize: 22, fontFamily: font.bold }}>
                    {this.props.year}
                  </Text>
                </Text>
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
              <View
                style={{
                  height: 175,
                  marginBottom: 10,
                }}>
                <Text style={styles.label}>
                  Sort by:{' '}
                  <Text style={{ fontSize: 22, fontFamily: font.bold }}>
                    {this.renderName(this.props.sortType, SORT_TYPES)}
                  </Text>
                </Text>
                <ScrollView style={{ backgroundColor: '#0f0f0f' }}>
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
              <Text style={styles.label}>
                Minimum Rating:{' '}
                <Text style={{ fontSize: 22, fontFamily: font.bold }}>
                  {this.props.minRating}
                </Text>
              </Text>
              <Slider
                backgroundColor={'#222'}
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginBottom: 10,
                }}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor={colors.darkRed}
                maximumTrackTintColor={colors.mediumRed}
                thumbTintColor={colors.lightRed}
                step={0.5}
                value={this.props.minRating}
                onSlidingComplete={this.props.onMinRatingChange}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.setState({ active: false })}>
                <Text style={styles.buttonText}>Hide Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Text style={{ color: colors.white, paddingHorizontal: 10 }}>
          {this.props.year}, {this.renderName(this.props.sortType, SORT_TYPES)}, {this.props.minRating}
        </Text>
        <TouchableOpacity style={styles.button} onPress={this.showFilters}>
          <Text style={styles.buttonText}>Change Filters</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default FilterModal

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.mediumRed,
    borderRadius: 40,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  buttonText: {
    fontFamily: font.thin,
    color: colors.white,
    fontSize: 20,
    padding: 5,
  },
  item: {
    fontFamily: font.thin,
    backgroundColor: '#222',
    color: colors.white,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  active: {
    color: colors.mediumRed,
  },
  min: {
    color: colors.white,
  },
  label: {
    fontFamily: font.regular,
    fontSize: 18,
    color: colors.white,
    padding: 10,
  },
})
