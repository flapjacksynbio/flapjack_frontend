import React from 'react'
import FormFactory from '../Forms/Form'
import { Card, Row, Col } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import './Authentication.scss'

const Login = () => {
  const fields = [
    {
      name: 'Email',
      label: 'Email',
      type: 'email',
      PrefixComponent: MailOutlined,
      rules: { required: true, type: 'email' }
    },
    {
      name: 'Password',
      label: 'Password',
      type:'password',
      PrefixComponent: LockOutlined,
      rules: { required: true }
    }
  ]

  const onSubmit = (...args) => {
    console.log(args)
  }

  return (
    <Row align='middle' className='auth-form-container'>
      <Col xs={22} md={16} lg={12}>
        <Card>
          <FormFactory
            name='Login'
            onSubmit={onSubmit}
            fields={fields}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default Login
