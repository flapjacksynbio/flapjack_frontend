import React from 'react'
import FormFactory from '../Forms/Form'
import { Card, Row, Col, Typography, Button, message } from 'antd'
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import './Authentication.scss'
import PropTypes from 'prop-types'
import api from '../../api'

const Signup = ({ goToLogin }) => {
  const fields = [
    {
      name: 'username',
      label: 'Username',
      PrefixComponent: UserOutlined,
      rules: [{ required: true, max: 80, min: 3, whitespace: true }]
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      PrefixComponent: MailOutlined,
      rules: [{ required: true, type: 'email' }]
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      PrefixComponent: LockOutlined,
      rules: [{ required: true, min: 5, whitespace: true }]
    },
    {
      name: 'password_confirmation',
      label: 'Password Confirmation',
      type: 'password',
      PrefixComponent: LockOutlined,
      rules: [
        { required: true },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (!value || getFieldValue('password') === value) return Promise.resolve()
            return Promise.reject('Passwords don\'t match!')
          }
        })
      ]
    },
    // {
    //   name: 'web_site',
    //   label: 'Portfolio Site',
    //   type: 'url',
    //   PrefixComponent: GlobalOutlined,
    //   rules: [{
    //     type: 'url',
    //     transform(value) {
    //       if (value && !value.match(/^http(s?):\/\//i)) return `http://${value}`
    //       return value
    //     },
    //     required: false,
    //   }]
    // },
    // {
    //   name: 'profile_pic',
    //   label: 'Profile Picture',
    //   RenderField: ImageInput,
    //   rules: [{
    //     validator(rule, value) {
    //       if (!value) return Promise.resolve()
    //       const { file } = value
    //       if (file.type === 'image/jpeg' || file.type === 'image/png') {
    //         return Promise.resolve()
    //       }
    //       return Promise.reject('')
    //     }
    //   }]
    // }
  ]

  const onSubmit = async ({ username, email, password, password_confirmation }) => {
    if (password !== password_confirmation) {
      message.error('Passwords don\'t match')
      return
    }

    try {
      await api.register({ username, email, password, password2: password_confirmation })
    } catch (e) {
      message.error('There was an error with registration, please try again.')
    }
  }

  return (
    <Row align='middle' className='auth-form-container'>
      <Col xs={22} md={16} lg={12}>
        <Card title="Register on FlapJack">
          <FormFactory
            name='Signup'
            onSubmit={onSubmit}
            fields={fields}
            submitText="Register"
          />
          <Typography.Text>
            {'Already have an account? '}<Button type="link" onClick={goToLogin}>Log in here!</Button>
          </Typography.Text>
        </Card>
      </Col>
    </Row>
  )
}

Signup.propTypes = {
  goToLogin: PropTypes.func.isRequired,
}

export default Signup
