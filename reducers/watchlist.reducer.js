import { WATCHLIST } from '../actions/watchlist.actions'
import filter from 'lodash/filter'
const initial = {
  active: 'Not Watched',
  watched: [],
  notWatched: [],
}

export default function(state = initial, action) {
  switch (action.type) {
    case WATCHLIST.TOGGLE_ACTIVE:
      return {
        ...state,
        active: action.active,
      }
    case WATCHLIST.MAKE_WATCHED:
      const watchedMovie = state.notWatched.filter(
        movie => movie.id === action.id
      )[0]
      return {
        ...state,
        notWatched: state.notWatched.filter(movie => movie.id !== action.id),
        watched: [...state.watched, watchedMovie],
      }
    case WATCHLIST.MAKE_NOT_WATCHED:
      const notWatchedMovie = state.watched.filter(
        movie => movie.id === action.id
      )[0]
      return {
        ...state,
        notWatched: [...state.notWatched, notWatchedMovie],
        watched: state.watched.filter(movie => movie.id !== action.id),
      }
    case WATCHLIST.ADD_MOVIE:
      return {
        ...state,
        notWatched: [...state.notWatched, action.movie],
      }
    case WATCHLIST.REMOVE_MOVIE:
      const newWatched = state.watched.filter(
        movie => movie.id !== action.movie.id
      )
      const newNotWatched = state.notWatched.filter(
        movie => movie.id !== action.movie.id
      )
      return {
        ...state,
        notWatched: newWatched,
        watched: newNotWatched,
      }
    default:
      return state
  }
}
