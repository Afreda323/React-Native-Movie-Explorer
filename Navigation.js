import { TabNavigator } from 'react-navigation'

import Discover from './pages/Discover'
import MovieDetail from './pages/MovieDetail'
import Movies from './pages/Movies'
import Ratings from './pages/Ratings'
import Search from './pages/Search'

const Navigation = TabNavigator({
  Discover: {
    screen: Discover,
  },
  Movies: {
    screen: Movies,
  },
  Search: {
    screen: Search,
  },
  Ratings: {
    screen: Ratings,
  },
  MovieDetail: {
    screen: MovieDetail,
  },
})

export default Navigation
