import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import logo from '~/src/assets/images/logo.png'
import PropTypes from 'prop-types'

const FlapHeader = ({ routes = [] }) => {
  const [current, setCurrent] = React.useState(routes[0].key)

  const handleClick = e => setCurrent(e.key)

  const menuButtons = routes.filter(({ navbarRenderer }) => navbarRenderer)

  return (
    <Layout.Header id="flapjack-header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Flapjack Logo" />
          <span className="logo-title">FlapJack</span>
        </Link>
      </div>
      <Menu theme='dark' className="navbar" onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
        {menuButtons.map(route =>
          <Menu.Item key={`menu-${route.label}`}>
            {route.navbarRenderer(route)}
          </Menu.Item>
        )}
        <Menu.SubMenu
          title={<span><UserOutlined />MrEarle</span>}
        >
          <Menu.Item key='upload'>
            <Link to='/upload'>Upload</Link>
          </Menu.Item>
          <Menu.Item key='massive-upload'>
            <Link to='/massive-upload'>Massive Upload</Link>
          </Menu.Item>
          <Menu.Item key='sign-out'>
            Sign Out
          </Menu.Item>
        </Menu.SubMenu>
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
