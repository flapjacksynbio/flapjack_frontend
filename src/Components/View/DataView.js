import React from 'react'
import { Row, Col, Empty } from 'antd'
import Selection from './Selection'

const DataView = () => {
  return (
    <Row gutter={20}>
      <Col span={6}>
        <Selection onSubmit={console.log} />
      </Col>
      <Col span={18} style={{ padding: 20 }}>
        <Empty
          description="Select data to plot"
        />
      </Col>
    </Row>
  )
}

DataView.propTypes = {}

export default DataView
