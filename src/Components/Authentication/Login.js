import React from 'react'
import FormFactory from '../Forms/Form'
import { Card, Row, Col, Typography, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './Authentication.scss'
import PropTypes from 'prop-types'
import api from '~/src/api'

const Login = ({ goToSignUp }) => {
  const fields = [
    {
      name: 'username',
      label: 'Username',
      PrefixComponent: UserOutlined,
      rules: [{ required: true }]
    },
    {
      name: 'password',
      label: 'Password',
      type:'password',
      PrefixComponent: LockOutlined,
      rules: [{ required: true }]
    }
  ]

  const onSubmit = async ({ username, password}) => {
    try {
      await api.logIn({ username, password })
    } catch (e) {
      message.error('Credentials are invalid! Please try again.')
    }
  }

  return (
    <Row align='middle' className='auth-form-container'>
      <Col xs={22} md={16} lg={12}>
        <Card title="Login to FlapJack">
          <FormFactory
            name='Login'
            onSubmit={onSubmit}
            fields={fields}
            submitText="Login"
          />
          <Typography.Text>
            {'Don\'t have an account? '}<Button type="link" onClick={goToSignUp}>Register here!</Button>
          </Typography.Text>
        </Card>
      </Col>
    </Row>
  )
}

Login.propTypes = {
  goToSignUp: PropTypes.func.isRequired
}

export default Login
