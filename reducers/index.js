import { combineReducers } from 'redux'
import movie from './movie.reducer'
import watchlist from './watchlist.reducer'
import discover from './discover.reducer'

export default {
  movie,
  watchlist,
  discover,
}
