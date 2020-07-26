import React from 'react'
import PropTypes from 'prop-types'
import Plotly from 'plotly.js'
import createPlotlyComponent from 'react-plotly.js/factory'
import InputNumber from '../Forms/InputNumber'
import { Row, Modal } from 'antd'
import {
  downloadJSON,
  styleTraces,
  screenLayout,
  paperLayout,
  downloadPNG,
  getPlotlyImageUrl,
} from './helper'
import Download from './Download'
import FormFactory from '../Forms/Form'
const PlotlyPlot = createPlotlyComponent(Plotly)

// Fields for customizing PNG plot attributes
const downloadPNGFields = [
  {
    name: 'fontSize',
    label: 'Font size',
    showLabel: true,
    type: 'number',
    RenderField: InputNumber,
    min: 1,
    step: 0.05,
    rules: [{ required: true }],
  },
  {
    name: 'width',
    label: 'Width',
    showLabel: true,
    type: 'number',
    RenderField: InputNumber,
    min: 1,
    addonAfter: 'inches',
    step: 0.05,
    rules: [{ required: true }],
  },
  {
    name: 'height',
    label: 'Height',
    showLabel: true,
    type: 'number',
    RenderField: InputNumber,
    min: 1,
    addonAfter: 'inches',
    step: 0.05,
    rules: [{ required: true }],
  },
  {
    name: 'lineWidth',
    label: 'Line width',
    showLabel: true,
    type: 'number',
    RenderField: InputNumber,
    min: 1,
    step: 0.05,
    rules: [{ required: true }],
  },
]

const Plot = ({ data = {}, title = '' }) => {
  const [modalVisible, setModalVisible] = React.useState(false)

  // Compute plot layouts
  const minColumns = Math.min(3, data.n_subplots)
  const columns = Math.max(minColumns, Math.floor(Math.sqrt(data.n_subplots)))
  const rows = Math.ceil(data.n_subplots / columns)

  const layout = screenLayout(title, rows, columns)

  const plotData = styleTraces(data.traces)

  // Function called after submitting png attributes form
  const onGeneratePNG = async (values) => {
    const { fontSize, width, lineWidth } = values
    const imgUrl = await getPlotlyImageUrl(
      paperLayout(title, rows, columns, width, 1.5, fontSize),
      styleTraces(data.traces, false, lineWidth),
    )
    await downloadPNG(imgUrl, title)
    setModalVisible(false)
  }

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
          onDownloadPNG={() => setModalVisible(true)}
        />
      </Row>
      <Modal
        title="Download Plot as PNG"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={400}
      >
        <FormFactory
          name="PNG Form"
          submitText="Download"
          onSubmit={onGeneratePNG}
          initialValues={{
            fontSize: 6,
            width: 4.5,
            height: 3,
            lineWidth: 4,
          }}
          fields={downloadPNGFields}
        />
      </Modal>
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
