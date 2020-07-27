import React from 'react'
import { FileAddOutlined, ExperimentOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import SelectOrCreate from '../Forms/SelectOrCreate'
import TextArea from '../Forms/TextArea'
import Checkbox from '../Forms/Checkbox'
import RadioGroup from '../Forms/RadioGroup'
import FileInput from '../Forms/FileInput'

// Stepped Form fields for Assay creation. See Forms/SteppedForm
const uploadSteps = [
  {
    title: 'Upload File',
    icon: <FileAddOutlined />,
    fields: [
      {
        name: 'study',
        label: 'Study',
        showLabel: true,
        RenderField: SelectOrCreate,
        url: 'study/',
        extraQueryParams: { is_owner: true },
        createFields: [
          {
            name: 'name',
            label: 'Name',
            placeholder: 'Name',
            showLabel: true,
            rules: [{ required: true, max: 80, min: 3, whitespace: false }],
          },
          {
            name: 'description',
            label: 'Description',
            showLabel: true,
            RenderField: TextArea,
            rules: [{ required: true }],
          },
          {
            name: 'doi',
            label: 'DOI',
            placeholder: 'DOI',
            showLabel: true,
            rules: [{ required: true, type: 'url' }],
          },
          {
            name: 'public',
            label: 'Public',
            RenderField: Checkbox,
          },
        ],
        rules: [{ required: true }],
      },
      {
        name: 'machine',
        label: 'Machine',
        showLabel: true,
        placeholder: 'Machine',
        options: [
          { key: 'htx', label: 'HTX Synergy' },
          { key: 'bmg', label: 'BMG' },
          { key: 'fluopi', label: 'FluoPi' },
        ],
        RenderField: RadioGroup,
        rules: [{ required: true }],
      },
      {
        name: 'data_file',
        label: 'Data File',
        showLabel: true,
        RenderField: FileInput,
        rules: [{ required: true }],
      },
    ],
  },
  {
    title: 'Assay',
    icon: <ExperimentOutlined />,
    fields: [
      {
        name: 'mock_title2',
        label: 'mock_title2',
        RenderField() {
          return (
            <Typography.Title level={3}>
              Assays description and temperature
            </Typography.Title>
          )
        },
      },
      {
        name: 'name',
        label: 'Name',
        showLabel: true,
        rules: [{ required: true, max: 80, min: 3 }],
      },
      {
        name: 'description',
        label: 'Description',
        showLabel: true,
        RenderField: TextArea,
        rules: [{ required: true }],
      },
      {
        name: 'temperature',
        label: 'Temperature',
        showLabel: true,
        type: 'number',
        rules: [{ required: true }],
        addonAfter: '°C',
      },
    ],
  },
]

export default uploadSteps
