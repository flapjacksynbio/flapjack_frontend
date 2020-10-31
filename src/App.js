import { Layout } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, useHistory } from 'react-router-dom'
import './App.scss'
import FlapHeader from './Components/Header'
import routes from './routes'

const { Content, Footer } = Layout

function App({ loggedIn }) {
  const history = useHistory()
  const availableRoutes = routes(loggedIn)

  const contentClass = history.location.pathname === '/view' ? 'full-width' : ''

  return (
    <Layout className="layout">
      <FlapHeader routes={availableRoutes} />
      <Content id="flapjack-content" className={contentClass}>
        <div className="site-layout-content">
          <Switch>
            {[...availableRoutes].reverse().map(({ route, viewRenderer: Renderer }) => (
              <Route path={route} key={`route-${route}`} component={Renderer} />
            ))}
          </Switch>
        </div>
      </Content>
      <Footer className="footer" theme="dark">
        <span>
          © 2020 Copyright: <a href="https://rudge-lab.org/">Rudge Lab - Pontificia Universidad  Católica de Chile</a>
        </span>
      </Footer>
    </Layout>
  )
}

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  loggedIn: !!state.session.access,
})

export default connect(mapStateToProps)(App)
