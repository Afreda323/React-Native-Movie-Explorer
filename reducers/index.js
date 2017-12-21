import { combineReducers } from 'redux'
import movie from './movie.reducer'
import watchlist from './watchlist.reducer'

export default combineReducers({
  movie,
  watchlist,
})
