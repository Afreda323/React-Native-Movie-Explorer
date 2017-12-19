import { MOVIE } from '../actions/movie.actions'

const initial = { activeFilter: 'popular', searchInput: '' }

export default function(state = initial, action) {
  switch (action.type) {
    case MOVIE.UPDATE_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.str,
      }
    case MOVIE.CLEAR_SEARCH_INPUT:
      return {
        ...state,
        searchInput: '',
      }
    case MOVIE.UPDATE_FILTER:
      return {
        ...state,
        activeFilter: action.filter,
      }
    default:
      return state
  }
}
