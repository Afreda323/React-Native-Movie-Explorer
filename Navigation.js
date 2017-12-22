import { TabNavigator, StackNavigator } from 'react-navigation'

import Discover from './pages/Discover'
import MovieDetail from './pages/MovieDetail'
import Movies from './pages/Movies'
import Watchlist from './pages/Watchlist'
import Search from './pages/Search'

import colors from './constants/colors'
import font from './constants/fontFamily'

const MainScreens = TabNavigator(
  {
    Movies: {
      screen: Movies,
    },
    Discover: {
      screen: Discover,
    },
    Search: {
      screen: Search,
    },
    Watchlist: {
      screen: Watchlist,
    },
  },
  {
    initialRouteName: 'Watchlist',
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
