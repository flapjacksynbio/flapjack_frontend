import React from 'react'
import PropTypes from 'prop-types'
import { Button, Menu, Dropdown } from 'antd'
import { DownloadOutlined, DesktopOutlined, FileOutlined } from '@ant-design/icons'

const Download = ({ onDownload }) => {
  const menu = (
    <Menu>
      <Menu.Item onClick={onDownload}>
        <DesktopOutlined />
        Screen Format
      </Menu.Item>
      <Menu.Item onClick={() => onDownload(false)}>
        <FileOutlined />
        Paper Format
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
  onDownload: PropTypes.func.isRequired,
}

export default Download
