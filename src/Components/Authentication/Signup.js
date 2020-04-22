import React from 'react'
import FormFactory from '../Forms/Form'
import { Card, Row, Col } from 'antd'
import { MailOutlined, LockOutlined, UserOutlined, GlobalOutlined } from '@ant-design/icons'
import './Authentication.scss'
import ImageInput from '../Forms/ImageInput'

const Signup = () => {
  const fields = [
    {
      name: 'username',
      label: 'Username',
      PrefixComponent: UserOutlined,
      rules: [{ required: true }]
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
      type:'password',
      PrefixComponent: LockOutlined,
      rules: [{ required: true }]
    },
    {
      name: 'password_confirmation',
      label: 'Password Confirmation',
      type:'password',
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
    {
      name: 'web_site',
      label: 'Portfolio Site',
      type: 'url',
      PrefixComponent: GlobalOutlined,
      rules: [{ type: 'url' }]
    },
    {
      name: 'profile_pic',
      label: 'Profile Picture',
      RenderField: ImageInput,
      rules: [{
        validator(rule, value) {
          const { file } = value
          if (file.type === 'image/jpeg' || file.type === 'image/png') {
            return Promise.resolve()
          }
          return Promise.reject('')
        }
      }]
    }
  ]

  const onSubmit = (...args) => {
    console.log(args)
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
        </Card>
      </Col>
    </Row>
  )
}

export default Signup
