import { TabNavigator, StackNavigator } from 'react-navigation'

import Discover from './pages/Discover'
import MovieDetail from './pages/MovieDetail'
import Movies from './pages/Movies'
import Ratings from './pages/Ratings'
import Search from './pages/Search'

const MainScreens = TabNavigator(
  {
    Movies: {
      screen: Movies,
    },
    Discover: {
      screen: Discover,
    },
    Ratings: {
      screen: Ratings,
    },
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
      style: {
        backgroundColor: '#000',
      },
      labelStyle: {
        color: '#fff',
      },
    },
  }
)

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
}, {
    mode: 'modal'
})

export default Navigation
