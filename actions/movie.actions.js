export const MOVIE = {
  UPDATE_FILTER: 'UPDATE_FILTER',
  UPDATE_SEARCH_INPUT: 'UPDATE_SEARCH_INPUT',
  CLEAR_SEARCH_INPUT: 'CLEAR_SEARCH_INPUT',
}

/**
 * Update the filter of the movie page
 * @param {String} filter The name of the filter, 
 * ie: popular, upcoming, etc
 */
export const updateFilter = filter => {
  let updatedFilter = ''
  if (filter === 'Popular') {
    updatedFilter = 'popular'
  } else if (filter === 'Coming Soon') {
    updatedFilter = 'upcoming'
  } else if (filter === 'Now Playing') {
    updatedFilter = 'nowPlaying'
  } else if (filter === 'Top Rated') {
    updatedFilter = 'topRated'
  }
  return {
    filter: updatedFilter,
    type: MOVIE.UPDATE_FILTER,
  }
}

/**
 * For controlled search input
 * @param {String} str The newly updated text input
 */
export const updateSearchInput = str => ({
  str,
  type: MOVIE.UPDATE_SEARCH_INPUT,
})

/**
 * Clears the existing search text
 */
export const clearSearchInput = () => ({
  type: MOVIE.CLEAR_SEARCH_INPUT,
})
