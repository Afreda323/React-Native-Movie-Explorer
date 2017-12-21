import { WATCHLIST } from '../actions/watchlist.actions'

const initial = {
  watched: [],
  notWatched: [],
}

export default function(state = initial, action) {
  switch (action.type) {
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
