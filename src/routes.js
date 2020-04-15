import Home from './Components/Home'
import Browse from './Components/Browse'
import View from './Components/View'
import Upload from './Components/Upload'
import MassiveUpload from './Components/MassiveUpload'

import NavButton from './Components/Header/NavButton'


const routes = [
  { label: 'Home', route: '/', navbarRenderer: NavButton, viewRenderer: Home },
  { label: 'Browse', route: '/browse', navbarRenderer: NavButton, viewRenderer: Browse },
  { label: 'View', route: '/view', navbarRenderer: NavButton, viewRenderer: View },
  { label: 'Massive Upload', route: '/upload', viewRenderer: Upload},
  { label: 'Massive Upload', route: '/massive-upload', viewRenderer: MassiveUpload}
]

export default routes