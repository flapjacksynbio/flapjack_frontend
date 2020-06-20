import React from 'react'
import { Row, Col, Empty, Typography, Progress } from 'antd'
import Selection from './Selection'
import PropTypes from 'prop-types'
import Plot from './Plot'

const DataView = ({ title, onRename, isAnalysis = false }) => {
  const [loadingData, setLoadingData] = React.useState(null)
  const [data, setData] = React.useState(null)

  const onPlot = (values) => {
    console.log(values)
    createWebsocket(values)
  }

  const createWebsocket = (values) => {
    const socket = new WebSocket('ws://localhost:8000/ws/registry')
    socket.onopen = () => {
      console.log('connected')
      setLoadingData(0)
      socket.send(JSON.stringify({ type: 'plot', parameters: values }))
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.type === 'progress_update') {
        setLoadingData(message.data.progress)
      } else if (message.type === 'plot_data') {
        setLoadingData(null)
        setData(message.data.values)
        socket.close()
      }
    }
  }

  const renderPlot = () => {
    if (data && data.length) {
      return <Plot data={data} />
    }

    if (loadingData !== null) {
      return <Progress type="circle" percent={loadingData} />
    }

    return <Empty description="Select data to plot" />
  }

  return (
    <>
      <Row gutter={20}>
        <Col span={6}>
          <Typography.Title
            editable={{ onChange: onRename }}
            style={{ marginLeft: 15, fontSize: 20 }}
          >
            {title}
          </Typography.Title>
          <Selection onSubmit={onPlot} isAnalysis={isAnalysis} />
        </Col>
        <Col span={18} style={{ padding: 20 }}>
          {renderPlot()}
        </Col>
      </Row>
    </>
  )
}

DataView.propTypes = {
  title: PropTypes.string.isRequired,
  onRename: PropTypes.func.isRequired,
  isAnalysis: PropTypes.bool,
}

export default DataView
