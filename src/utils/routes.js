import Search from '../components/Search/Search'
import Top10 from '../components/Top10/Top10'
import Insights from '../components/Insights/Insights'
import About from '../components/About/About'

export const routes = [
  {
    path: '/',
    component: Search,
    exact: true
  },
  {
    path: '/top10',
    component: Top10
  },
  {
    path: '/insights',
    component: Insights
  },
  {
    path: '/about',
    component: About
  }
]
