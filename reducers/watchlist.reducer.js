import { WATCHLIST } from '../actions/watchlist.actions'

const initial = {
    watched: [],
    notWatched: []
}

export default function(state = initial, action) {
  switch (action.type) {
    default:
      return state
  }
}
