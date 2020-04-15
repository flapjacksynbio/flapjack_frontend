import Home from './Components/Home'
import Browse from './Components/Browse'
import View from './Components/View'


const routes = [
  { label: 'Home', route: '/', navbarRenderer: null, viewRenderer: Home },
  { label: 'Browse', route: '/browse', navbarRenderer: null, viewRenderer: Browse },
  { label: 'View', route: '/view', navbarRenderer: null, viewRenderer: View }
]

export default routes