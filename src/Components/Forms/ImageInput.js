import React from 'react'
import { Upload, message, Form } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { getBase64 } from '../../utils/imageUtils'

const ImageInput = ({
  label,
  name,
  rules = {},
}) => {
  const [loading, setLoading] = React.useState(false)
  const [imageUrl, setImageUrl] = React.useState(null)

  const handleChange = ({ file }) => {
    if (file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (file.status === 'done') {
      // Get this url from response in real world.
      getBase64(file.originFileObj, imageUrl => {
        setImageUrl(imageUrl)
        setLoading(false)
      })
    }
  }

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  function beforeUpload(file) {

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    
    if (isJpgOrPng && isLt2M) {
      return true
    }

    setImageUrl(null)
    return false
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className='ant-upload-text'>Upload</div>
    </div>
  )

  return (
    <Form.Item
      hasFeedback
      name={name}
      rules={rules}
      label={label}
      valuePropName='file'
    >
      <Upload
        name={name}
        accept=".jpg,.jpeg,.png"
        listType='picture-card'
        className='avatar-uploader'
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={dummyRequest}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </Form.Item>
  )
}


ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  rules: PropTypes.array,
}

export default ImageInput
