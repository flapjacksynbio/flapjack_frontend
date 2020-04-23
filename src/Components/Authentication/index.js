import React from 'react'
import { Tabs } from 'antd'
import Login from './Login'
import Signup from './Signup'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

const Authentication = ({ user }) => {
  const params = new URLSearchParams(window.location.search)
  const queryTab = params.get('initialTab')
  const initialTab = ['login', 'signup'].includes(queryTab) ? queryTab : 'login'

  if (user) {
    return <Redirect to="/" />
  }

  return (
    <Tabs defaultActiveKey={initialTab}>
      <Tabs.TabPane tab='Log In' key='login'>
        <Login />
      </Tabs.TabPane>
      <Tabs.TabPane tab='Sign Up' key='signup'>
        <Signup />
      </Tabs.TabPane>
    </Tabs>
  )
}

Authentication.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.session
})

export default connect(mapStateToProps)(Authentication)
