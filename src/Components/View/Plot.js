import React from 'react'
import PropTypes from 'prop-types'
import Plotly from 'plotly.js'
import createPlotlyComponent from 'react-plotly.js/factory'
const PlotlyPlot = createPlotlyComponent(Plotly)

const Plot = ({ data = {} }) => {
  const minColumns = Math.min(3, data.n_subplots)
  const columns = Math.max(minColumns, Math.floor(Math.sqrt(data.n_subplots)))
  const rows = Math.ceil(data.n_subplots / columns)

  return (
    <PlotlyPlot
      style={{ width: '100%' }}
      useResizeHandler
      data={data.traces}
      layout={{
        autosize: true,
        grid: { columns, rows, pattern: 'independent' },
      }}
    />
  )
}

Plot.propTypes = {
  data: PropTypes.object,
}

export default Plot
