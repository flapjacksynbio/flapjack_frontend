import React from 'react'
import SteppedFormFactory from '../Forms/SteppedForm'
import SelectOrCreate from '../Forms/SelectOrCreate'
import getFieldParams from './extraFieldParams'
import PropTypes from 'prop-types'

/** Form for assay metadata sumbission */
const ExtraInfo = ({ onSubmit, extraInfoFields, loading = false, assayId }) => {
  const steps = Object.entries(extraInfoFields).map(([type, fields]) => ({
    title: type,
    fields: fields.map((field, i) => ({
      name: `${type}-${i}`,
      label: field,
      showLabel: true,
      rules: [{ required: true }],
      RenderField: SelectOrCreate,
      extraCreationValues: { assays: [assayId] },
      ...getFieldParams(type),
    })),
  }))

  return (
    <SteppedFormFactory
      name="Metadata"
      onSubmit={onSubmit}
      submitText="Submit Metadata"
      steps={steps}
      loading={loading}
    />
  )
}

ExtraInfo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  extraInfoFields: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  assayId: PropTypes.number.isRequired,
}

export default ExtraInfo
