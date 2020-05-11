import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'antd'
import TextArea from '../Forms/TextArea'
import FormFactory from '../Forms/Form'

const Metadata = ({
  study,
  onSubmit,
}) => {
  const fields = [
    {
      name: 'mock_title',
      label: 'mock_title',
      RenderField() {
        return <Typography.Title level={3}>Study: {study}</Typography.Title>
      }
    },
    {
      name: 'study_description',
      label: 'Description',
      showLabel: true,
      RenderField: TextArea
    },
    {
      name: 'doi',
      label: 'DOI',
      showLabel: true,
      RenderField: TextArea
    },
    {
      name: 'mock_title2',
      label: 'mock_title2',
      RenderField() {
        return <Typography.Title level={3}>Assays description and temperature</Typography.Title>
      }
    },
    {
      name: 'assay_description',
      label: 'Description',
      showLabel: true,
      RenderField: TextArea
    },
    {
      name: 'temperature',
      label: 'Temperature',
      showLabel: true,
      type: 'number',
      rules: [{ required: true }],
      addonAfter: '°C'
    }
  ]

  return (
    <FormFactory
      name="Metadata"
      fields={fields}
      submitText="Next"
      onSubmit={onSubmit}
    />
  )
}

Metadata.propTypes = {
  study: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Metadata
