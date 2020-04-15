import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import { Layout } from 'antd'
import FlapHeader from './Components/Header'
import routes from './routes'
import './App.scss'

const { Content } = Layout

function App() {
  return (
    <Router>

      <Layout className="layout">
        <FlapHeader routes={routes} />
        <Content id="flapjack-content">
          <div className="site-layout-content">
            <Switch>
              {[...routes].reverse().map(({ route, viewRenderer: Renderer }) => (
                <Route path={route} key={`route-${route}`}>
                  <Renderer />
                </Route>
              ))}
            </Switch>
          </div>
        </Content>
      </Layout>
    </Router>
  )
}

export default App
