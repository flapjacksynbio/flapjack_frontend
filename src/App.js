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

const { Content, Footer } = Layout

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
        <Footer className='footer' theme='dark'>
          <span>© 2019 Copyright: <a href="https://rudge-lab.org/">Flapjack Technologies</a></span>
        </Footer>
      </Layout>
    </Router>
  )
}

export default App
