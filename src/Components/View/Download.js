import React from 'react'
import PropTypes from 'prop-types'
import { Button, Menu, Dropdown } from 'antd'
import {
  DownloadOutlined,
  DesktopOutlined,
  FileOutlined,
  FileImageOutlined,
} from '@ant-design/icons'

const Download = ({ onDownloadJSON, onDownloadPNG }) => {
  const menu = (
    <Menu>
      <Menu.Item onClick={onDownloadJSON}>
        <DesktopOutlined />
        Screen Format
      </Menu.Item>
      <Menu.Item onClick={() => onDownloadJSON(false)}>
        <FileOutlined />
        Paper Format
      </Menu.Item>
      <Menu.Item onClick={onDownloadPNG}>
        <FileImageOutlined />
        PNG
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} placement="bottomCenter">
      <Button icon={<DownloadOutlined />}>Download</Button>
    </Dropdown>
  )
}

Download.propTypes = {
  onDownloadJSON: PropTypes.func.isRequired,
  onDownloadPNG: PropTypes.func.isRequired,
}

export default Download
