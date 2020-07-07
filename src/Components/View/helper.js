import _ from 'lodash'
import Plotly from 'plotly.js'

/**
 * Helper for downloading an object as a JSON file
 * @param {Object} jsonObject Object to download as JSON
 * @param {string} filename File name
 */
export const downloadJSON = (jsonObject, filename) => {
  const json = JSON.stringify(jsonObject)
  const blob = new Blob([json], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.setAttribute('download', `${filename}.json`)
  link.setAttribute('href', url)
  document.body.appendChild(link)
  link.click()
  link.remove()
}

/**
 * Generates a plotly image url
 * @param {Object} layout Plotly layout argument
 * @param {Object[]} traces Plotly traces withing the plot
 */
export const getPlotlyImageUrl = async (layout, traces) => {
  // eslint-disable-next-line no-unused-vars
  let { margin, xaxis, ..._layout } = layout
  _layout = {
    ..._layout,
    xaxis: { ...xaxis, automargin: true },
  }
  const tempElement = document.createElement('div')
  tempElement.setAttribute('id', 'temp_plotly_div')
  document.body.appendChild(tempElement)

  const plot = await Plotly.newPlot('temp_plotly_div', traces, _layout)

  const imgUrl = await Plotly.toImage(plot, { format: 'png' })

  tempElement.remove()
  return imgUrl
}

/**
 * Helper for downloading a plotly plot as a PNG file
 * @param {string} imageUrl Image url (url or base64 string)
 * @param {string} filename File name
 */
export const downloadPNG = async (imageUrl, filename) => {
  const link = document.createElement('a')
  link.setAttribute('download', `${filename}.png`)
  link.setAttribute('href', imageUrl)
  document.body.appendChild(link)
  link.click()
  link.remove()
}

/**
 * Get the styles of the traces for a plotly plot
 * @param {boolean} screen Wether to get screen or print style
 */
const traceStyles = (screen = true, lineWidth = null) => ({
  scatter: {
    marker: { size: 6 },
    line: { width: lineWidth || (screen ? 1 : 4) },
  },
  line: { marker: { size: 6 }, line: { width: 1 } },
})

/**
 * Get plotly screen layout argument
 * @param {string} title
 * @param {number} rows
 * @param {number} columns
 */
export const screenLayout = (title, rows, columns) => {
  const font_size = 10

  return {
    title: { text: title },
    grid: { columns, rows, pattern: 'independent' },
    autosize: true,
    paper_bgcolor: 'rgb(255,255,255)',
    template: 'plotly',
    font: { size: font_size },
    xaxis: {
      title: { font: { size: font_size } },
      tickwidth: 1,
      tickfont: { size: font_size },
      hoverformat: '.2e',
      linewidth: 1,
    },
    yaxis: {
      title: { font: { size: font_size } },
      tickwidth: 1,
      tickfont: { size: font_size },
      hoverformat: '.2e',
      linewidth: 1,
    },
    annotations: { font: { size: font_size } },
  }
}

/**
 * Get plotly print layout argument
 * @param {string} title
 * @param {number} rows
 * @param {number} columns
 */
export const paperLayout = (
  title,
  rows,
  columns,
  width = 990,
  aspect = 1.5,
  fontSize = 6,
) => {
  const _width = width
  const _height = width / aspect
  const _font_size = (fontSize * 300) / 72

  return {
    title: { text: title },
    grid: { columns, rows, pattern: 'independent' },
    autosize: false,
    width: _width,
    height: _height,
    margin: { l: 50, r: 50, b: 50, t: 50, pad: 0 },
    paper_bgcolor: 'rgb(255,255,255)',
    template: 'simple_white',
    font: { size: _font_size },
    annotations: { font: { size: _font_size } },
    xaxis: {
      title: { font: { size: _font_size } },
      tickwidth: 3,
      tickfont: { size: _font_size },
      linewidth: 3,
    },
    yaxis: {
      title: { font: { size: _font_size } },
      tickwidth: 3,
      tickfont: { size: _font_size },
      linewidth: 3,
    },
  }
}

/**
 * Modify plotly trace styles
 * @param {Object[]} traces
 * @param {boolean} screen Wether to get screen or print style
 */
export const styleTraces = (traces, screen = true, lineWidth = null) => {
  const styles = traceStyles(screen, lineWidth)
  return traces.map((trace) => {
    let result = trace
    if (styles[trace.type]) {
      result = _.merge({}, trace, styles[trace.type])
    }

    if (result.fill === 'toself') {
      result.line = { ...result.line, width: 0 }
    }

    return result
  })
}
