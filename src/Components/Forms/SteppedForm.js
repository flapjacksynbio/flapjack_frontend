import React from 'react'
import { Form, Steps, Card, Button } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import Field from './Field'

const SteppedFormFactory = ({ name, steps, onSubmit, style, submitText = 'Submit', loading = false }) => {
  const [current, setCurrent] = React.useState(0)
  const [form] = Form.useForm()

  React.useEffect(() => {
    const validations = []
    steps.forEach(() => validations.push(false))
  })

  const validateStep = async i => {
    const fieldNames = steps[i].fields.map(({ name }) => name)
    return form.validateFields(fieldNames)
      .then(() => true)
      .catch(() => false)
  }

  const goToNext = async i => {
    const valid = await validateStep(i)
    if (valid) {
      setCurrent(j => j + 1)
    }
  }

  const goTo = async i => {
    for (let j = 0; j < i; j++) {
      const valid = await validateStep(j)
      if (!valid) return
    }
    setCurrent(i)
  }


  const renderStep = (i) => {
    const { fields, title } = steps[i]
    return (
      <div style={{ display: current === i ? 'block' : 'none' }} key={title}>
        <Card className="step-card">
          {fields.map(field => <Field {...field} key={`form-${name}-${field.name}`} />)}
          <Form.Item>
            <div className="step-buttons">
              {i !== steps.length - 1 && (
                <Button type='primary' onClick={() => goToNext(i)}>
                  Next
                </Button>
              )}
              {i === steps.length - 1 && (
                <Button type='primary' htmlType='submit'>
                  {loading ? <LoadingOutlined spin /> : submitText}
                </Button>
              )}
              {i > 0 && (
                <Button type='primary' onClick={() => setCurrent(i => i - 1)}>
                  Previous
                </Button>
              )}
            </div>
          </Form.Item>
        </Card>
      </div>
    )
  }

  return (
    <Form
      name={name}
      onFinish={onSubmit}
      style={style}
      className='flapjack-form'
      labelCol={{ span: 6 }}
      form={form}
    >
      <div>
        <Steps current={current} onChange={goTo}>
          {steps.map(({ title, icon }) => <Steps.Step key={title} title={title} icon={icon} />)}
        </Steps>
        <div className="form-step-content">
          {steps.map((step, i) => renderStep(i))}
        </div>
      </div>
    </Form>
  )
}

SteppedFormFactory.propTypes = {
  name: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(
      PropTypes.shape(Field.propTypes)
    ).isRequired,
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
  style: PropTypes.object,
  submitText: PropTypes.string,
  loading: PropTypes.bool
}

export default SteppedFormFactory
