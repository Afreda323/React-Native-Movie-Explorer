import { DISCOVER } from '../actions/discover.actions'

const initial = {
  sort: 'popularity.desc',
  minRating: 0,
  year: '2016',
}

export default function(state = initial, action) {
  switch (action.type) {
    case DISCOVER.UPDATE_MIN_RATING:
      return {
        ...state,
        minRating: action.minRating,
      }
    case DISCOVER.UPDATE_SORT:
      return {
        ...state,
        sort: action.sortType,
      }
    case DISCOVER.UPDATE_YEAR:
      return {
        ...state,
        year: action.year,
      }
    default:
      return state
  }
}
