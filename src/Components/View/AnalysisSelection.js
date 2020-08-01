import React from 'react'
import analysisOptions from './analysisOptions'
import PropTypes from 'prop-types'
import { Select, Form, Input } from 'antd'

/** Renders Analysis Selection form items */
const renderItem = (props, i) => {
  const { isFormItem = false, renderer: Renderer, ...otherProps } = props
  if (!isFormItem) {
    const { name, label, valuePropName, rules, ...other } = otherProps
    return (
      <Form.Item
        key={i}
        name={name}
        label={label}
        valuePropName={valuePropName}
        rules={rules}
      >
        <Renderer {...other} />
      </Form.Item>
    )
  }

  return <Renderer key={i} {...otherProps} />
}

renderItem.propTypes = {
  isFormItem: PropTypes.bool,
  renderer: PropTypes.any.isRequired,
}

/**
 * Selection of analysis parameters
 * @param {object} props
 * @param {*} formInstance Ant Design form instance for analysis parameter selection
 */
const AnalysisSelection = ({ formInstance }) => {
  const [selectedType, setSelectedType] = React.useState('Mean Expression')

  // Set initial values when either the form instance changes or the analysis type changes
  React.useEffect(() => {
    formInstance.setFieldsValue({ type: selectedType })
    formInstance.setFieldsValue(
      analysisOptions[selectedType].reduce((acc, opt) => {
        return { ...acc, [opt.name]: opt.initial_value }
      }, {}),
    )
  }, [selectedType, formInstance])

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
        <Form.Item name="type" style={{ display: 'none' }}>
          <Input value={selectedType} />
        </Form.Item>
        {analysisOptions[selectedType].map(renderItem)}
      </Form>
    </>
  )
}

AnalysisSelection.propTypes = {
  formInstance: PropTypes.object.isRequired,
}

export default AnalysisSelection
