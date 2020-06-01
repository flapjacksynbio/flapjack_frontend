import React from 'react'
import PropTypes from 'prop-types'
import { PlusOutlined } from '@ant-design/icons'
import { Menu, Dropdown, Button } from 'antd'

const AddTab = ({ actions }) => {
  const onClick = ({ key }) => {
    actions[key]()
  }

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="0">Data Viewer</Menu.Item>
      <Menu.Item key="1">Analysis</Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu}>
      <Button>Add Tab <PlusOutlined /></Button>
    </Dropdown>  
  )
}

AddTab.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.func).isRequired
}

export default AddTab
