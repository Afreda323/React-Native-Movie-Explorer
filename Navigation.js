import { TabNavigator, StackNavigator } from 'react-navigation'

import Discover from './pages/Discover'
import MovieDetail from './pages/MovieDetail'
import Movies from './pages/Movies'
import Ratings from './pages/Ratings'
import Search from './pages/Search'

import colors from './constants/colors'
import font from './constants/fontFamily'

const MainScreens = TabNavigator(
  {
    Search: {
      screen: Search,
    },
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
    tabBarOptions: {
      style: {
        backgroundColor: colors.black,
      },
      labelStyle: {
        color: colors.white,
        fontFamily: font.thin,
      },
    },
  }
)

const Navigation = StackNavigator(
  {
    App: {
      screen: MainScreens,
    },
    MovieDetail: {
      screen: MovieDetail,
    },
  },
  {
    mode: 'modal',
  }
)

export default Navigation
