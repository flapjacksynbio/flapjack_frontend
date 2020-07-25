import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const DropdownButton = ({ label, options }) => {
  const handleMenuClick = (e) => {
    return options[e.key].onClick(e)
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {Object.entries(options).map(([k, o]) => (
        <Menu.Item key={k}>{o.label}</Menu.Item>
      ))}
    </Menu>
  )

  return (
    <Dropdown overlay={menu}>
      <Button>
        {label} <DownOutlined />
      </Button>
    </Dropdown>
  )
}

DropdownButton.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    }),
  ),
}

export default DropdownButton
