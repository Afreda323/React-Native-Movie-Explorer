export const WATCHLIST = {
  ADD_MOVIE: 'ADD_MOVIE',
  REMOVE_MOVIE: 'REMOVE_MOVIE',
  TOGGLE_ACTIVE: 'TOGGLE_ACTIVE',
  MAKE_WATCHED: 'MAKE_WATCHED',
  MAKE_NOT_WATCHED: 'MAKE_NOT_WATCHED',
}

/**
 * Add a movie to watchlist
 * @param {Object} movie The movie object for what you want
 * to add to the watchlist
 */
export const addMovie = movie => ({ type: WATCHLIST.ADD_MOVIE, movie })
/**
 * Remove a movie to watchlist
 * @param {Object} movie The movie object for what you want
 * to add to the watchlist
 */
export const removeMovie = movie => ({ type: WATCHLIST.REMOVE_MOVIE, movie })
/**
 * Switch the active watchlist page
 * @param {String} active The page you want to switch to
 * Watched or Not Watched
 */
export const toggleActive = active => ({ type: WATCHLIST.TOGGLE_ACTIVE, active })
/**
 * Switch the active watchlist page
 * @param {String} id The id of the watched movie
 */
export const makeWatched = id => ({ type: WATCHLIST.MAKE_WATCHED, id })
/**
 * Switch the active watchlist page
 * @param {String} id The id of the not watched movie
 */
export const makeNotWatched = id => ({ type: WATCHLIST.MAKE_NOT_WATCHED, id })

