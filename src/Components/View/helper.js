import _ from 'lodash'

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

const traceStyles = (screen = true) => ({
  scatter: {
    marker: { size: 6 },
    line: { width: screen ? 1 : 4 },
  },
  line: { marker: { size: 6 }, line: { width: 1 } },
})

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

export const paperLayout = (
  title,
  rows,
  columns,
  width = 3.3,
  aspect = 1.5,
  font_size = 6,
) => {
  const _width = 300 * width
  const _height = width / aspect
  const _font_size = (font_size * 300) / 72

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

export const styleTraces = (traces, screen = true) => {
  const styles = traceStyles(screen)
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
