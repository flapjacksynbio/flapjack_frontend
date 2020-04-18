import React from 'react'
import { Card, Row, Col } from 'antd'
import { UserAddOutlined, LoginOutlined } from '@ant-design/icons'
import './Home.scss'
import logo from '~/src/assets/images/logo.png'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='container'>
      <Card className="home-header">
        <Row align="middle" className="home-content" gutter={16}>
          <Col sm={24} md={8}>
            <img alt="FlapJack Logo" src={logo} />
          </Col>
          <Col sm={24} md={16}>
            <span className='home-title'>FlapJack</span>
          </Col>
        </Row>
      </Card>
      <Row style={{ width: '100%' }} justify="space-between">
        <Col xs={20} md={12} style={{ padding: 5 }}>
          <Link to='/authentication?initialTab=signup'>
            <Card
              hoverable
              cover={<UserAddOutlined style={{ fontSize: '8em', color: '#007bff', padding: 10 }} />}
              className='home-cards'
            >
              <div>Ready to get started?</div>
              <div>Sign Up!</div>
            </Card>
          </Link>
        </Col>
        <Col xs={20} md={12} style={{ padding: 5 }}>
          <Link to='/authentication'>
            <Card
              hoverable
              cover={<LoginOutlined style={{ fontSize: '8em', color: '#007bff', padding: 10 }} />}
              className='home-cards'
            >
              <div>Already have an account?</div>
              <div>Log In!</div>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

Home.propTypes = {}


export default Home
