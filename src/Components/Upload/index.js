import React from 'react'
import { Steps, Card } from 'antd'
import { ExperimentOutlined, FileMarkdownOutlined, ReconciliationOutlined } from '@ant-design/icons'
import FileUpload from './FileUpload'
import './index.scss'
import Metadata from './Metadata'
import Signals from './Signals'

const Upload = () => {
  const [current, setCurrent] = React.useState(0)
  const [uploadData, setUploadData] = React.useState(null)
  const [metadata, setMetadata] = React.useState(null)
  const [signals, setSignals] = React.useState(null)

  const steps = [
    {
      title: 'Upload File',
      content: FileUpload,
      icon: <ExperimentOutlined />,
      getData: () => uploadData,
      getProps: () => ({
        onSubmit(data) {
          setUploadData(data)
          setCurrent(curr => curr + 1)
        }
      })
    },
    {
      title: 'Metadata',
      content: Metadata,
      icon: <FileMarkdownOutlined />,
      getData: () => metadata,
      getProps: () => ({
        study: uploadData.study,
        onSubmit(data) {
          setMetadata(data)
          setCurrent(curr => curr + 1)
        }
      })
    },
    {
      title: 'Signals',
      content: Signals,
      icon: <ReconciliationOutlined />,
      getData: () => signals,
      getProps: () => ({
        onSubmit(data) {
          setSignals(data)
          console.log([uploadData, metadata, signals])
        }
      })
    }
  ]

  const renderStep = (i) => {
    const { content: Component, getProps } = steps[i]
    return (
      <Component {...getProps()} />
    )
  }

  return (
    <div>
      <Steps current={current}>
        {steps.map(({ title, icon }) => <Steps.Step key={title} title={title} icon={icon} />)}
      </Steps>
      <div className="step-container">
        <Card className="card">{renderStep(current)}</Card>
      </div>
    </div>
  )
}

Upload.propTypes = {}

export default Upload
