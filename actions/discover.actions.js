export const DISCOVER = {
  UPDATE_YEAR: 'UPDATE_YEAR',
  UPDATE_SORT: 'UPDATE_SORT',
  UPDATE_MIN_RATING: 'UPDATE_MIN_RATING',
}

/**
 * Update the release year
 * @param {Number} updateYear filter the release year of the desired movies
 */
export const updateYear = year => {
  return {
    year,
    type: DISCOVER.UPDATE_YEAR,
  }
}
/**
 * Update the sort type
 * @param {String} sort change the sort type of the desired movies
 */
export const updateSort = sort => {
  return {
    sortType: sort,
    type: DISCOVER.UPDATE_SORT,
  }
}
/**
 * Update the minimum rating
 * @param {String} minRating change the minimum rating of the desired movies
 */
export const updateMinRating = minRating => {
  return {
    minRating,
    type: DISCOVER.UPDATE_MIN_RATING,
  }
}
