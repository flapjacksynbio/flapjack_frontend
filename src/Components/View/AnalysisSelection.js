import React from 'react'
import analysisOptions from './analysisOptions'
import PropTypes from 'prop-types'
import { Select, Form } from 'antd'

const AnalysisSelection = ({ formInstance }) => {
  const [selectedType, setSelectedType] = React.useState('Mean Expression')

  React.useEffect(() => {
    formInstance.setFieldsValue(
      analysisOptions[selectedType].reduce((acc, opt) => {
        return { ...acc, [opt.name]: opt.initial_value }
      }, {}),
    )
  }, [selectedType])

  const onSubmit = (values) => {
    values['type'] = selectedType
    return values
  }

  return (
    <>
      <Select
        value={selectedType}
        onChange={setSelectedType}
        style={{ width: '100%', marginBottom: 10 }}
      >
        {Object.keys(analysisOptions).map((opt, i) => (
          <Select.Option key={i} value={opt}>
            {opt}
          </Select.Option>
        ))}
      </Select>
      <Form
        form={formInstance}
        name={selectedType}
        labelCol={{ span: 14 }}
        size="small"
        onFinish={onSubmit}
      >
        {analysisOptions[selectedType].map(
          ({ name, label, renderer: Renderer, valuePropName, rules, ...other }, i) => (
            <Form.Item
              key={i}
              name={name}
              label={label}
              valuePropName={valuePropName}
              rules={rules}
            >
              <Renderer {...other} />
            </Form.Item>
          ),
        )}
      </Form>
    </>
  )
}

AnalysisSelection.propTypes = {
  formInstance: PropTypes.object.isRequired,
}

export default AnalysisSelection
