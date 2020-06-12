import React from 'react'
import { Menu } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserMenu from './UserMenu'
import NavButton from './NavButton'
import { logoutCurrentUser } from '../../redux/actions/session'

const NavMenu = ({ menuButtons, mode = 'horizontal', user, onLogout }) => {
  const isHorizontal = mode === 'horizontal'
  let SubMenu = null

  if (user.isLoggingIn) {
    SubMenu = (
      <Menu.Item>
        <LoadingOutlined spin />
      </Menu.Item>
    )
  } else if (user.access) {
    SubMenu = UserMenu(isHorizontal, user.username, onLogout)
  } else {
    SubMenu = (
      <Menu.Item key="menu-login">
        <NavButton route="/authentication" label="Log In" />
      </Menu.Item>
    )
  }

  return (
    <Menu
      theme="dark"
      className={isHorizontal ? 'navbar' : ''}
      style={isHorizontal ? {} : { width: '100%' }}
      mode={mode}
    >
      {menuButtons.map((route) => (
        <Menu.Item key={`menu-${route.label}`}>{route.navbarRenderer(route)}</Menu.Item>
      ))}
      {SubMenu}
    </Menu>
  )
}

NavMenu.propTypes = {
  menuButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
      navbarRenderer: PropTypes.func,
    }),
  ).isRequired,
  mode: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  user: PropTypes.object,
  onLogout: PropTypes.func,
}

const mapStateToProps = (state) => ({
  user: state.session,
})

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logoutCurrentUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu)
