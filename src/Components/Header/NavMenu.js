import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const NavMenu = ({ menuButtons, mode = 'horizontal' }) => {
  const isHorizontal = mode === 'horizontal'
  
  return (
    <Menu
      theme='dark'
      className={isHorizontal ? 'navbar' : ''}
      style={isHorizontal ? {} : { width: '100%' }}
      mode={mode}
    >
      {menuButtons.map(route =>
        <Menu.Item key={`menu-${route.label}`}>
          {route.navbarRenderer(route)}
        </Menu.Item>
      )}
      {isHorizontal &&
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
      }
      {!isHorizontal && (
        <Menu.Item key='upload'>
          <Link to='/upload'>Upload</Link>
        </Menu.Item>
      )}
      {!isHorizontal && (
        <Menu.Item key='massive-upload'>
          <Link to='/massive-upload'>Massive Upload</Link>
        </Menu.Item>
      )}
      {!isHorizontal && (
        <Menu.Item key='sign-out'>
          Sign Out
        </Menu.Item>
      )}
    </Menu>
  )
}

NavMenu.propTypes = {
  menuButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
      navbarRenderer: PropTypes.func
    }),
  ).isRequired,
  mode: PropTypes.oneOf(['horizontal', 'vertical']).isRequired
}

export default NavMenu
