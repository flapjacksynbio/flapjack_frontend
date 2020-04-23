import { Layout } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import './App.scss'
import FlapHeader from './Components/Header'
import routes from './routes'

const { Content, Footer } = Layout

function App({ loggedIn }) {
  const availableRoutes = routes(loggedIn)

  return (
    <Layout className="layout">
      <FlapHeader routes={availableRoutes} />
      <Content id="flapjack-content">
        <div className="site-layout-content">
          <Switch>
            {[...availableRoutes].reverse().map(({ route, viewRenderer: Renderer }) => (
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
  )
}

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  loggedIn: !!state.session
})

export default connect(mapStateToProps)(App)

