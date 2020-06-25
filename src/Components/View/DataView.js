import React from 'react'
import { Row, Col, Empty, Typography, Progress, message } from 'antd'
import Selection from './Selection'
import PropTypes from 'prop-types'
import Plot from './Plot'
import { addPlotToTab } from '../../redux/actions/viewTabs'
import { connect } from 'react-redux'
import apiWebSocket from '../../api/apiWebSocket'

const DataView = ({ title, onRename, plotData, plotId, addPlot, isAnalysis = false }) => {
  const [loadingData, setLoadingData] = React.useState(null)

  const onPlot = (values) => {
    console.log(values)
    createWebsocket(values)
  }

  const createWebsocket = (values) => {
    apiWebSocket.connect('plot', {
      onConnect(event, socket) {
        setLoadingData(0)
        socket.send(JSON.stringify({ type: 'plot', parameters: values }))
      },
      onReceiveHandlers: {
        progress_update: (message) => setLoadingData(message.data.progress),
        plot_data: (message, event, socket) => {
          setLoadingData(null)
          addPlot(plotId, message.data)
          socket.close()
        },
      },
      onError(event, socket) {
        message.error('There was an error processing the data. Please try again')
        socket.close()
      },
    })
  }

  const renderPlot = () => {
    if (plotData) {
      return <Plot data={plotData} />
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
          <Row justify="center">{renderPlot()}</Row>
        </Col>
      </Row>
    </>
  )
}

DataView.propTypes = {
  title: PropTypes.string.isRequired,
  onRename: PropTypes.func.isRequired,
  isAnalysis: PropTypes.bool,
  plotData: PropTypes.object,
  addPlot: PropTypes.func.isRequired,
  plotId: PropTypes.string.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  addPlot: (tabId, plotData) => dispatch(addPlotToTab(tabId, plotData)),
})

export default connect(null, mapDispatchToProps)(DataView)
