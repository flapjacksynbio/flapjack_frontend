import React from 'react'
import { Card, Row, Col } from 'antd'
import './Home.scss'
import logo from '~/src/assets/images/logo.png'
import NotLoggedInCards from './NotLoggedInCards'
import LoggedInCards from './LoggedInCards'

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
      <NotLoggedInCards />
      <LoggedInCards />
    </div>
  )
}

Home.propTypes = {}


export default Home
