import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Space } from 'antd'
import BrowseTable from './BrowseTable'

const Studies = () => {
  const renderUri = (uri, item) => (
    <a key={`uri-${item.id}`} href={uri} target="_blank" rel="noopener noreferrer">
      {uri}
    </a>
  )

  const renderActions = (text, record) => (
    <Space>
      <Link
        to={{
          pathname: '/view',
          study: { id: record.id, name: record.name },
          tabType: 'data',
        }}
      >
        <Button>View study</Button>
      </Link>
      <Link
        to={{
          pathname: '/view',
          study: { id: record.id, name: record.name },
          tabType: 'analysis',
        }}
      >
        <Button>Analyze study</Button>
      </Link>
    </Space>
  )

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'DOI',
      dataIndex: 'doi',
      key: 'doi',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: renderUri,
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: renderActions,
    },
  ]

  return <BrowseTable columns={columns} dataUrl="study/" />
}

Studies.propTypes = {}

export default Studies
