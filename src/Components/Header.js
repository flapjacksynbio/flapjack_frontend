import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import logo from '../assets/images/logo.png'
import PropTypes from 'prop-types'

const FlapHeader = ({ routes=[] }) => {
  const [current, setCurrent] = React.useState(routes[0].key)

  const handleClick = e => setCurrent(e.key)

  return (
    <Layout.Header id="flapjack-header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Flapjack Logo" />
          <span className="logo-title">FlapJack</span>
        </Link>
      </div>
      <Menu theme='dark' className="navbar" onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
        {routes.map(({ label, route, renderer }) => 
          <Menu.Item key={`menu-${label}`}>
            <Link to={route}>{ renderer ? renderer(label) : label }</Link>
          </Menu.Item>
        )}
      </Menu>
    </Layout.Header>
  )
}

FlapHeader.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
      navbarRenderer: PropTypes.func
    }),
  ).isRequired,
}

export default FlapHeader
