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
 * @param {number} width measured in inches
 * @param {number} height measured in inches
 * @param {number} fontSize
 */
export const paperLayout = (
  title,
  rows,
  columns,
  width = 3.3,
  height = 5,
  fontSize = 6,
) => {
  const _width = width * 300
  const _height = height * 300
  const _font_size = (fontSize * 300) / 72

  return {
    title: { text: title },
    grid: { columns, rows, pattern: 'independent' },
    autosize: false,
    width: _width,
    height: _height,
    margin: { l: 50, r: 50, b: 50, t: 50, pad: 0 },
    paper_bgcolor: 'rgb(255,255,255)',
    template: paperWhiteTemplate,
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

const paperWhiteTemplate = {
  layout: {
    colorway: [
      '#636efa',
      '#EF553B',
      '#00cc96',
      '#ab63fa',
      '#FFA15A',
      '#19d3f3',
      '#FF6692',
      '#B6E880',
      '#FF97FF',
      '#FECB52',
    ],
    font: {
      color: '#2a3f5f',
    },
    hovermode: 'closest',
    hoverlabel: {
      align: 'left',
    },
    paper_bgcolor: 'white',
    plot_bgcolor: 'white',
    polar: {
      bgcolor: 'white',
      angularaxis: {
        gridcolor: '#EBF0F8',
        linecolor: '#EBF0F8',
        ticks: '',
      },
      radialaxis: {
        gridcolor: '#EBF0F8',
        linecolor: '#EBF0F8',
        ticks: '',
      },
    },
    ternary: {
      bgcolor: 'white',
      aaxis: {
        gridcolor: '#DFE8F3',
        linecolor: '#A2B1C6',
        ticks: '',
      },
      baxis: {
        gridcolor: '#DFE8F3',
        linecolor: '#A2B1C6',
        ticks: '',
      },
      caxis: {
        gridcolor: '#DFE8F3',
        linecolor: '#A2B1C6',
        ticks: '',
      },
    },
    coloraxis: {
      colorbar: {
        outlinewidth: 0,
        ticks: '',
      },
    },
    colorscale: {
      sequential: [
        [0.0, '#0d0887'],
        [0.1111111111111111, '#46039f'],
        [0.2222222222222222, '#7201a8'],
        [0.3333333333333333, '#9c179e'],
        [0.4444444444444444, '#bd3786'],
        [0.5555555555555556, '#d8576b'],
        [0.6666666666666666, '#ed7953'],
        [0.7777777777777778, '#fb9f3a'],
        [0.8888888888888888, '#fdca26'],
        [1.0, '#f0f921'],
      ],
      sequentialminus: [
        [0.0, '#0d0887'],
        [0.1111111111111111, '#46039f'],
        [0.2222222222222222, '#7201a8'],
        [0.3333333333333333, '#9c179e'],
        [0.4444444444444444, '#bd3786'],
        [0.5555555555555556, '#d8576b'],
        [0.6666666666666666, '#ed7953'],
        [0.7777777777777778, '#fb9f3a'],
        [0.8888888888888888, '#fdca26'],
        [1.0, '#f0f921'],
      ],
      diverging: [
        [0, '#8e0152'],
        [0.1, '#c51b7d'],
        [0.2, '#de77ae'],
        [0.3, '#f1b6da'],
        [0.4, '#fde0ef'],
        [0.5, '#f7f7f7'],
        [0.6, '#e6f5d0'],
        [0.7, '#b8e186'],
        [0.8, '#7fbc41'],
        [0.9, '#4d9221'],
        [1, '#276419'],
      ],
    },
    xaxis: {
      gridcolor: '#EBF0F8',
      linecolor: '#EBF0F8',
      ticks: '',
      title: {
        standoff: 15,
      },
      zerolinecolor: '#EBF0F8',
      automargin: true,
      zerolinewidth: 2,
      showgrid: false,
    },
    yaxis: {
      gridcolor: '#EBF0F8',
      linecolor: '#EBF0F8',
      ticks: '',
      title: {
        standoff: 15,
      },
      zerolinecolor: '#EBF0F8',
      automargin: true,
      zerolinewidth: 2,
      showgrid: false,
    },
    scene: {
      xaxis: {
        backgroundcolor: 'white',
        gridcolor: '#DFE8F3',
        linecolor: '#EBF0F8',
        showbackground: true,
        ticks: '',
        zerolinecolor: '#EBF0F8',
        gridwidth: 2,
      },
      yaxis: {
        backgroundcolor: 'white',
        gridcolor: '#DFE8F3',
        linecolor: '#EBF0F8',
        showbackground: true,
        ticks: '',
        zerolinecolor: '#EBF0F8',
        gridwidth: 2,
      },
      zaxis: {
        backgroundcolor: 'white',
        gridcolor: '#DFE8F3',
        linecolor: '#EBF0F8',
        showbackground: true,
        ticks: '',
        zerolinecolor: '#EBF0F8',
        gridwidth: 2,
      },
    },
    shapedefaults: {
      line: {
        color: '#2a3f5f',
      },
    },
    annotationdefaults: {
      arrowcolor: '#2a3f5f',
      arrowhead: 0,
      arrowwidth: 1,
    },
    geo: {
      bgcolor: 'white',
      landcolor: 'white',
      subunitcolor: '#C8D4E3',
      showland: true,
      showlakes: true,
      lakecolor: 'white',
    },
    title: {
      x: 0.05,
    },
    mapbox: {
      style: 'light',
    },
  },
  data: {
    histogram2dcontour: [
      {
        type: 'histogram2dcontour',
        colorbar: {
          outlinewidth: 0,
          ticks: '',
        },
        colorscale: [
          [0.0, '#0d0887'],
          [0.1111111111111111, '#46039f'],
          [0.2222222222222222, '#7201a8'],
          [0.3333333333333333, '#9c179e'],
          [0.4444444444444444, '#bd3786'],
          [0.5555555555555556, '#d8576b'],
          [0.6666666666666666, '#ed7953'],
          [0.7777777777777778, '#fb9f3a'],
          [0.8888888888888888, '#fdca26'],
          [1.0, '#f0f921'],
        ],
      },
    ],
    choropleth: [
      {
        type: 'choropleth',
        colorbar: {
          outlinewidth: 0,
          ticks: '',
        },
      },
    ],
    histogram2d: [
      {
        type: 'histogram2d',
        colorbar: {
          outlinewidth: 0,
          ticks: '',
        },
        colorscale: [
          [0.0, '#0d0887'],
          [0.1111111111111111, '#46039f'],
          [0.2222222222222222, '#7201a8'],
          [0.3333333333333333, '#9c179e'],
          [0.4444444444444444, '#bd3786'],
          [0.5555555555555556, '#d8576b'],
          [0.6666666666666666, '#ed7953'],
          [0.7777777777777778, '#fb9f3a'],
          [0.8888888888888888, '#fdca26'],
          [1.0, '#f0f921'],
        ],
      },
    ],
    heatmap: [
      {
        type: 'heatmap',
        colorbar: {
          outlinewidth: 0,
          ticks: '',
        },
        colorscale: [
          [0.0, '#0d0887'],
          [0.1111111111111111, '#46039f'],
          [0.2222222222222222, '#7201a8'],
          [0.3333333333333333, '#9c179e'],
          [0.4444444444444444, '#bd3786'],
          [0.5555555555555556, '#d8576b'],
          [0.6666666666666666, '#ed7953'],
          [0.7777777777777778, '#fb9f3a'],
          [0.8888888888888888, '#fdca26'],
          [1.0, '#f0f921'],
        ],
      },
    ],
    heatmapgl: [
      {
        type: 'heatmapgl',
        colorbar: {
          outlinewidth: 0,
          ticks: '',
        },
        colorscale: [
          [0.0, '#0d0887'],
          [0.1111111111111111, '#46039f'],
          [0.2222222222222222, '#7201a8'],
          [0.3333333333333333, '#9c179e'],
          [0.4444444444444444, '#bd3786'],
          [0.5555555555555556, '#d8576b'],
          [0.6666666666666666, '#ed7953'],
          [0.7777777777777778, '#fb9f3a'],
          [0.8888888888888888, '#fdca26'],
          [1.0, '#f0f921'],
        ],
      },
    ],
    contourcarpet: [
      {
        type: 'contourcarpet',
        colorbar: {
          outlinewidth: 0,
          ticks: '',
        },
      },
    ],
    contour: [
      {
        type: 'contour',
        colorbar: {
          outlinewidth: 0,
          ticks: '',
        },
        colorscale: [
          [0.0, '#0d0887'],
          [0.1111111111111111, '#46039f'],
          [0.2222222222222222, '#7201a8'],
          [0.3333333333333333, '#9c179e'],
          [0.4444444444444444, '#bd3786'],
          [0.5555555555555556, '#d8576b'],
          [0.6666666666666666, '#ed7953'],
          [0.7777777777777778, '#fb9f3a'],
          [0.8888888888888888, '#fdca26'],
          [1.0, '#f0f921'],
        ],
      },
    ],
    surface: [
      {
        type: 'surface',
        colorbar: {
          outlinewidth: 0,
          ticks: '',
        },
        colorscale: [
          [0.0, '#0d0887'],
          [0.1111111111111111, '#46039f'],
          [0.2222222222222222, '#7201a8'],
          [0.3333333333333333, '#9c179e'],
          [0.4444444444444444, '#bd3786'],
          [0.5555555555555556, '#d8576b'],
          [0.6666666666666666, '#ed7953'],
          [0.7777777777777778, '#fb9f3a'],
          [0.8888888888888888, '#fdca26'],
          [1.0, '#f0f921'],
        ],
      },
    ],
    mesh3d: [
      {
        type: 'mesh3d',
        colorbar: {
          outlinewidth: 0,
          ticks: '',
        },
      },
    ],
    scatter: [
      {
        type: 'scatter',
        marker: {
          colorbar: {
            outlinewidth: 0,
            ticks: '',
          },
        },
      },
    ],
    parcoords: [
      {
        type: 'parcoords',
        line: {
          colorbar: {
            outlinewidth: 0,
            ticks: '',
          },
        },
      },
    ],
    scatterpolargl: [
      {
        type: 'scatterpolargl',
        marker: {
          colorbar: {
            outlinewidth: 0,
            ticks: '',
          },
        },
      },
    ],
    bar: [
      {
        error_x: {
          color: '#2a3f5f',
        },
        error_y: {
          color: '#2a3f5f',
        },
        marker: {
          line: {
            color: 'white',
            width: 0.5,
          },
        },
        type: 'bar',
      },
    ],
    scattergeo: [
      {
        type: 'scattergeo',
        marker: {
          colorbar: {
            outlinewidth: 0,
            ticks: '',
          },
        },
      },
    ],
    scatterpolar: [
      {
        type: 'scatterpolar',
        marker: {
          colorbar: {
            outlinewidth: 0,
            ticks: '',
          },
        },
      },
    ],
    histogram: [
      {
        type: 'histogram',
        marker: {
          colorbar: {
            outlinewidth: 0,
            ticks: '',
          },
        },
      },
    ],
    scattergl: [
      {
        type: 'scattergl',
        marker: {
          colorbar: {
            outlinewidth: 0,
            ticks: '',
          },
        },
      },
    ],
    scatter3d: [
      {
        type: 'scatter3d',
        line: {
          colorbar: {
            outlinewidth: 0,
            ticks: '',
          },
        },
        marker: {
          colorbar: {
            outlinewidth: 0,
            ticks: '',
          },
        },
      },
    ],
    scattermapbox: [
      {
        type: 'scattermapbox',
        marker: {
          colorbar: {
            outlinewidth: 0,
            ticks: '',
          },
        },
      },
    ],
    scatterternary: [
      {
        type: 'scatterternary',
        marker: {
          colorbar: {
            outlinewidth: 0,
            ticks: '',
          },
        },
      },
    ],
    scattercarpet: [
      {
        type: 'scattercarpet',
        marker: {
          colorbar: {
            outlinewidth: 0,
            ticks: '',
          },
        },
      },
    ],
    carpet: [
      {
        aaxis: {
          endlinecolor: '#2a3f5f',
          gridcolor: '#C8D4E3',
          linecolor: '#C8D4E3',
          minorgridcolor: '#C8D4E3',
          startlinecolor: '#2a3f5f',
        },
        baxis: {
          endlinecolor: '#2a3f5f',
          gridcolor: '#C8D4E3',
          linecolor: '#C8D4E3',
          minorgridcolor: '#C8D4E3',
          startlinecolor: '#2a3f5f',
        },
        type: 'carpet',
      },
    ],
    table: [
      {
        cells: {
          fill: {
            color: '#EBF0F8',
          },
          line: {
            color: 'white',
          },
        },
        header: {
          fill: {
            color: '#C8D4E3',
          },
          line: {
            color: 'white',
          },
        },
        type: 'table',
      },
    ],
    barpolar: [
      {
        marker: {
          line: {
            color: 'white',
            width: 0.5,
          },
        },
        type: 'barpolar',
      },
    ],
    pie: [
      {
        automargin: true,
        type: 'pie',
      },
    ],
  },
}
