export const WATCHLIST = {
  ADD_MOVIE: 'ADD_MOVIE',
  REMOVE_MOVIE: 'REMOVE_MOVIE',
  WATCH_MOVIE: 'WATCH_MOVIE',
}

/**
 * Add a movie to watchlist
 * @param {Object} The movie object for what you want
 * to add to the watchlist
 */
export const addMovie = movie => ({ type: WATCHLIST.ADD_MOVIE, movie })
export const removeMovie = movie => ({ type: WATCHLIST.REMOVE_MOVIE, movie })