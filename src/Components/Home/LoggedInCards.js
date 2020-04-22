import React from 'react'
import { Row, Col, Card } from 'antd'
import { DesktopOutlined, LineChartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const LoggedInCards = () => {
  return (
    <Row style={{ width: '100%' }} justify="center">
      <Col xs={20} md={8} style={{ padding: 5 }}>
        <Link to='/upload'>
          <Card
            hoverable
            className='home-cards'
          >
            <DesktopOutlined style={{ fontSize: '6em', color: '#00f', padding: 10 }} />
            <div className='home-card-title'>Upload</div>
            <div className='home-card-content'>
              Store your kinetic data from microplate reader and other sources
            </div>
          </Card>
        </Link>
      </Col>
      <Col xs={20} md={8} style={{ padding: 5 }}>
        <Link to='/authentication'>
          <Card
            hoverable
            className='home-cards'
          >
            <LineChartOutlined style={{ fontSize: '6em', color: '#00f', padding: 10 }} />
            <div className='home-card-title'>Search and Analyse</div>
            <div className='home-card-content'>Query public and private data to visualize, analyse and model</div>
          </Card>
        </Link>
      </Col>
    </Row>)
}

export default LoggedInCards
