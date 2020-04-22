import React from 'react'
import { Tabs } from 'antd'
import Login from './Login'
import Signup from './Signup'

const Authentication = () => {
  const params = new URLSearchParams(window.location.search)
  const queryTab = params.get('initialTab')
  const initialTab = ['login', 'signup'].includes(queryTab) ? queryTab : 'login'
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


export default Authentication
