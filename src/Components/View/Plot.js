import React from 'react'
import PropTypes from 'prop-types'
import Plotly from 'plotly.js'
import createPlotlyComponent from 'react-plotly.js/factory'
const PlotlyPlot = createPlotlyComponent(Plotly)

const Plot = ({ data = [] }) => {
  return (
    <PlotlyPlot
      style={{ width: '100%', height: 500 }}
      useResizeHandler
      data={[
        {
          x: data.map(([x]) => x),
          y: data.map(([, y]) => y),
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
      ]}
      layout={{ autosize: true, title: 'A Fancy Plot' }}
    />
  )
}

Plot.propTypes = {
  data: PropTypes.array,
}

export default Plot
