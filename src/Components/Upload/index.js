import React from 'react'
import { ExperimentOutlined, FileMarkdownOutlined, /*ReconciliationOutlined,*/ LoadingOutlined } from '@ant-design/icons'
import { Typography, Card, message } from 'antd'
import Multiselect from '~/src/Components/Forms/Multiselect'
import TextArea from '~/src/Components/Forms/TextArea'
import SteppedFormFactory from '../Forms/SteppedForm'
// import FileInput from '../Forms/FileInput'
import api from '../../api'
import CreateStudy from './CreateStudy'
import { useHistory } from 'react-router-dom'

const Upload = () => {
  const [studies, setStudies] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const history = useHistory()

  const loadStudies = async () => {
    const { results: data } = await api.get('study/')
    setStudies(data)
  }

  React.useEffect(() => {
    loadStudies()
  }, [])

  const steps = [
    {
      title: 'Upload File',
      icon: <ExperimentOutlined />,
      fields: [
        {
          name: 'study',
          label: 'Study Name',
          showLabel: true,
          placeholder: 'Study',
          options: studies,
          optionLabel: 'name',
          RenderField: CreateStudy,
          callback: shouldRefresh => shouldRefresh && loadStudies(),
          rules: [{ required: true }]
        },
        {
          name: 'machine',
          label: 'Machine',
          showLabel: true,
          placeholder: 'Machine',
          options: ['HTX Synergy', 'BMG', 'FluoPi'],
          RenderField: Multiselect,
          rules: [{ required: true }]
        },
        // {
        //   name: 'data_file',
        //   label: 'Data File',
        //   showLabel: true,
        //   RenderField: FileInput,
        //   rules: [{ required: true }]
        // }
      ]
    },
    {
      title: 'Metadata',
      icon: <FileMarkdownOutlined />,
      fields: [
        {
          name: 'mock_title2',
          label: 'mock_title2',
          RenderField() {
            return <Typography.Title level={3}>Assays description and temperature</Typography.Title>
          }
        },
        {
          name: 'name',
          label: 'Name',
          showLabel: true,
          rules: [{ required: true, max: 80, min: 3 }]
        },
        {
          name: 'description',
          label: 'Description',
          showLabel: true,
          RenderField: TextArea,
          rules: [{ required: true }]
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
    },
    // {
    //   title: 'Signals',
    //   icon: <ReconciliationOutlined />,
    //   fields: [
    //     {
    //       name: 'mock_title',
    //       label: 'mock_title',
    //       RenderField() {
    //         return <Typography.Title level={3}>Name your signals</Typography.Title>
    //       }
    //     },
    //     {
    //       name: 'b',
    //       label: 'B',
    //       showLabel: true,
    //       rules: [{ required: true }],
    //     },
    //     {
    //       name: 'g',
    //       label: 'G',
    //       showLabel: true,
    //       rules: [{ required: true }],
    //     },
    //     {
    //       name: 'r',
    //       label: 'R',
    //       showLabel: true,
    //       rules: [{ required: true }],
    //     }
    //   ]
    // }
  ]

  const onSubmit = async (data) => {
    const { name, machine, description, temperature, study: studyId } = data
    setLoading(true)
    let success = false
    const study = studies.find(({ id }) => id === studyId)
    if (study) {
      success = await api.post('assay/', {
        name, machine, description, temperature, study: study.id
      })
        .then(({ id }) => !!id)
        .catch(() => false)
    }
    setLoading(false)

    if (success) {
      message.success('Data uploaded successfully!')
      history.push('browse')
    } else {
      message.error('There was an error uploading the data.')
    }
  }

  if (studies === null) {
    return (
      <Card bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingOutlined style={{ fontSize: 50 }} spin />
        <div>
          <Typography.Text style={{ fontSize: 25 }}>Loading available studies...</Typography.Text>
        </div>
      </Card>
    )
  }

  return (
    <SteppedFormFactory
      name='UpladForm'
      steps={steps}
      onSubmit={onSubmit}
      submitText="Submit"
      loading={loading}
    />
  )
}

Upload.propTypes = {}

export default Upload
