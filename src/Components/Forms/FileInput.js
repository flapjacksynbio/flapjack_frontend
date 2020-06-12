import React from 'react'
import { Upload, Form, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const FileInput = ({ label, name, rules = {} }) => {
  const [fileList, setFileList] = React.useState([])

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  const baseRules = [
    {
      validator(rule, value) {
        if (!value) return Promise.reject('No files selected.')
        const { fileList } = value
        if (fileList.length === 0) {
          return Promise.reject('No files selected.')
        } else if (fileList.length > 1) {
          return Promise.reject('Too many files.')
        }
        return Promise.resolve()
      },
    },
  ]

  const onChange = ({ fileList }) => {
    if (!fileList) {
      setFileList([])
      return
    }
    setFileList(fileList.slice(-1))
  }

  return (
    <Form.Item
      name={name}
      rules={[...baseRules, ...rules]}
      label={label}
      valuePropName="file"
    >
      <Upload
        name={name}
        multiple={false}
        listType="picture"
        customRequest={dummyRequest}
        onChange={onChange}
        fileList={fileList}
        style={{ maxWidth: 100 }}
      >
        <Button>
          <UploadOutlined /> Upload
        </Button>
      </Upload>
    </Form.Item>
  )
}

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  rules: PropTypes.array,
}

export default FileInput
