import React, { Component } from 'react'
import { View, Text, Platform, StyleSheet, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'

// GIVE ROLE TO CAST

import * as actions from '../actions/discover.actions'
import discover from '../query/discover'

import ImageList from '../components/ImageList'
import FilterModal from '../components/FilterModal'

import colors from '../constants/colors'
import font from '../constants/fontFamily'

class Discover extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Discover',
    headerStyle: {
      backgroundColor: colors.black,
      paddingTop: 10,
      marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    headerTitleStyle: {
      color: colors.white,
      fontSize: 18,
      fontFamily: font.regular,
      alignSelf: 'center',
    },

    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-eye' : 'ios-eye-outline'}
        size={30}
        color={focused ? colors.mediumRed : colors.white}
      />
    ),
  })
  render() {
    const {
      updateYear,
      updateMinRating,
      updateSort,
      year,
      sort,
      minRating,
    } = this.props
    const { discover, error, loading } = this.props.data
    const { navigate } = this.props.navigation
    if (error) {
      console.log(error)
    }
    return (
      <View style={styles.page}>
        <FilterModal
          sortType={sort}
          year={year}
          minRating={minRating}
          onSelectYear={updateYear}
          onSelectSort={updateSort}
          onMinRatingChange={updateMinRating}
        />
        {!loading && discover && discover.results.length > 0 ? (
          <ImageList
            onLoadMore={this.props.loadMoreEntries}
            movies={discover.results}
            onClick={id => navigate('MovieDetail', { id })}
          />
        ) : (
          <Text
            style={{
              color: colors.white,
              fontFamily: font.thin,
              fontSize: 20,
              padding: 20,
            }}>
            Nothing matches your criteria
          </Text>
        )}
        {loading && (
          <Text
            style={{
              color: colors.white,
              fontFamily: font.thin,
              fontSize: 20,
            }}>
            Loading...
          </Text>
        )}
      </View>
    )
  }
}

const mapStateToProps = ({ discover: { minRating, year, sort } }) => ({
  minRating,
  year,
  sort,
})
const withRedux = connect(mapStateToProps, actions)

const withApollo = graphql(discover, {
    options: ({ minRating, year, sort }) => {
      return { variables: { minRating, year, sort, page: 1 } }
    },
    props({ data }) {
      return {
        data,
        loadMoreEntries() {
          return data.fetchMore({
            variables: {
              page: data.discover.page + 1,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult
              }
              return Object.assign({}, previousResult, {
                discover: {
                  ...previousResult.discover,
                  page: previousResult.discover.page + 1,
                  results: [
                    ...previousResult.discover.results,
                    ...fetchMoreResult.discover.results,
                  ],
                },
              })
            },
          })
        },
      }
    },
  })

export default compose(withRedux, withApollo)(Discover)

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.black,
    flex: 1,
  },
})
