import React from 'react'
import PropTypes from 'prop-types'
import Plotly from 'plotly.js'
import createPlotlyComponent from 'react-plotly.js/factory'
const PlotlyPlot = createPlotlyComponent(Plotly)

const Plot = ({ data = {} }) => {
  return (
    <PlotlyPlot
      style={{ width: '100%', height: 500 }}
      useResizeHandler
      data={data.traces}
      layout={{
        autosize: true,
        //title: 'A Fancy Plot',
        grid: { rows: 1, columns: data.n_subplots, pattern: 'independent' },
      }}
    />
  )
}

Plot.propTypes = {
  data: PropTypes.object,
}

export default Plot
