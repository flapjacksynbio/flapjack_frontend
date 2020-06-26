import React from 'react'
import PropTypes from 'prop-types'
import Plotly from 'plotly.js'
import createPlotlyComponent from 'react-plotly.js/factory'
import { Row, Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { downloadJSON } from './helper'
const PlotlyPlot = createPlotlyComponent(Plotly)

const Plot = ({ data = {}, title = '' }) => {
  const minColumns = Math.min(3, data.n_subplots)
  const columns = Math.max(minColumns, Math.floor(Math.sqrt(data.n_subplots)))
  const rows = Math.ceil(data.n_subplots / columns)

  const layout = {
    autosize: true,
    title,
    grid: { columns, rows, pattern: 'independent' },
  }

  return (
    <>
      <PlotlyPlot
        style={{ width: '100%' }}
        useResizeHandler
        data={data.traces}
        layout={{ ...layout }}
      />
      <Row justify="end" style={{ width: '100%' }}>
        <Button
          icon={<DownloadOutlined />}
          onClick={() => downloadJSON({ ...data, layout }, title)}
        >
          Download Data
        </Button>
      </Row>
    </>
  )
}

Plot.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.shape({
    traces: PropTypes.array.isRequired,
    n_subplots: PropTypes.number.isRequired,
  }).isRequired,
}

export default Plot
