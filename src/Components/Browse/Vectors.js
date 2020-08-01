import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Dropdown, Menu, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import BrowseTable from './BrowseTable'

const DNAs = () => {
  const history = useHistory()

  const renderUris = (uris) => (
    <div style={{ display: 'block' }}>
      {uris.map((uri, i) => (
        <div key={i}>
          <a href={uri}>{uri}</a>
        </div>
      ))}
    </div>
  )

  const renderActions = (text, record) => {
    const handleMenuClick = (e) => {
      // Redirect to View screen with selected parameters
      history.push({
        pathname: '/view',
        state: { vector: { id: record.id, name: record.name }, tabType: e.key },
      })
    }

    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="data">Data Viewer</Menu.Item>
        <Menu.Item key="analysis">Analysis</Menu.Item>
      </Menu>
    )

    return (
      <Space>
        <Dropdown overlay={menu}>
          <Button>
            View <DownOutlined />
          </Button>
        </Dropdown>
      </Space>
    )
  }

  // const columns = [
  //   {
  //     title: 'Names',
  //     dataIndex: 'names',
  //     render: (names) => names.join(', '),
  //   },
  //   {
  //     title: 'Sbol Uris',
  //     dataIndex: 'sboluris',
  //     render: renderUris,
  //   },
  //   {
  //     title: 'Actions',
  //     key: 'actions',
  //     render: renderActions,
  //   },
  // ]

  return <BrowseTable dataUrl="vector/" columns={[]} />
}

DNAs.propTypes = {}

export default DNAs