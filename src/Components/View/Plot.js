import React from 'react'
import PropTypes from 'prop-types'
import Plotly from 'plotly.js'
import createPlotlyComponent from 'react-plotly.js/factory'
import { Row } from 'antd'
import {
  downloadJSON,
  styleTraces,
  screenLayout,
  paperLayout,
  downloadPNG,
} from './helper'
import Download from './Download'
const PlotlyPlot = createPlotlyComponent(Plotly)

const Plot = ({ data = {}, title = '' }) => {
  const minColumns = Math.min(3, data.n_subplots)
  const columns = Math.max(minColumns, Math.floor(Math.sqrt(data.n_subplots)))
  const rows = Math.ceil(data.n_subplots / columns)

  const layout = screenLayout(title, rows, columns)

  const plotData = styleTraces(data.traces)

  return (
    <>
      <PlotlyPlot
        style={{ width: '100%' }}
        useResizeHandler
        data={plotData}
        layout={{ ...layout }}
      />
      <Row justify="end" style={{ width: '100%' }}>
        <Download
          onDownloadJSON={(screen = true) =>
            downloadJSON(
              {
                traces: screen ? plotData : styleTraces(data.traces, false),
                layout: screen ? layout : paperLayout(title, rows, columns),
              },
              title,
            )
          }
          onDownloadPNG={() =>
            downloadPNG(
              styleTraces(data.traces, false),
              paperLayout(title, rows, columns),
              title,
            )
          }
        />
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
