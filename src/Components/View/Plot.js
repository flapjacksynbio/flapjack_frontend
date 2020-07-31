import React from 'react'
import PropTypes from 'prop-types'
import Plotly from 'plotly.js'
import createPlotlyComponent from 'react-plotly.js/factory'
import InputNumber from '../Forms/InputNumber'
import { Row, Modal } from 'antd'
import {
  downloadJSON,
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
]

const Plot = ({ data = {}, title = '' }) => {
  const [modalVisible, setModalVisible] = React.useState(false)

  const layout = React.useMemo(
    () => ({ ...data.layout, ...screenLayout(title, data.layout) }),
    [data, title],
  )

  const paperWhiteLayout = React.useMemo(
    () => ({
      ...data.layout,
      ...paperLayout(title, 4.5, 3, 6, data.layout),
    }),
    [data, title],
  )

  // Function called after submitting png attributes form
  const onGeneratePNG = async (values) => {
    const { fontSize, width, height } = values
    const imgUrl = await getPlotlyImageUrl(
      { ...data.layout, ...paperLayout(title, width, height, fontSize, data.layout) },
      data.data,
    )
    await downloadPNG(imgUrl, title)
    setModalVisible(false)
  }

  return (
    <>
      <PlotlyPlot
        style={{ width: '100%' }}
        useResizeHandler
        data={data.data}
        layout={{ ...layout }}
      />
      <Row justify="end" style={{ width: '100%' }}>
        <Download
          onDownloadJSON={(screen = true) =>
            downloadJSON(
              {
                traces: data.data,
                layout: screen ? layout : paperWhiteLayout,
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
    data: PropTypes.array.isRequired,
    layout: PropTypes.object.isRequired,
  }).isRequired,
}

export default Plot
