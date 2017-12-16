import { TabNavigator, StackNavigator } from 'react-navigation'

import Discover from './pages/Discover'
import MovieDetail from './pages/MovieDetail'
import Movies from './pages/Movies'
import Ratings from './pages/Ratings'
import Search from './pages/Search'

const MainScreens = TabNavigator({
  Discover: {
    screen: Discover,
  },
  Movies: {
    screen: Movies,
  },
  Ratings: {
    screen: Ratings,
  },
})

const Navigation = StackNavigator({
  App: {
    screen: MainScreens,
  },
  Search: {
    screen: Search,
  },
  MovieDetail: {
    screen: MovieDetail,
  },
})

export default Navigation
