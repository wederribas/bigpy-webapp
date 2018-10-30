import Search from '../components/Search/Search'
import Top10 from '../components/Top10/Top10'
import Insights from '../components/Insights/Insights'
import About from '../components/About/About'
import Dashboard from '../components/Dashboard/Dashboard'

export const routes = [
  {
    path: '/',
    component: Search,
    exact: true
  },
  {
    path: '/dashboard/:companyName',
    component: Dashboard
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
