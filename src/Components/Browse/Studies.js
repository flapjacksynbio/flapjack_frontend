import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import BrowseTable from './BrowseTable'

const Studies = () => {
  const renderUri = (uri, item) => (
    <a key={`uri-${item.id}`} href={uri} target="_blank" rel="noopener noreferrer">
      {uri}
    </a>
  )

  const renderViewLink = (text, record) => (
    <Link
      to={{
        pathname: '/view',
        study: { id: record.id, name: record.name },
        tabType: 'data',
      }}
    >
      <Button>View study</Button>
    </Link>
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
      render: renderViewLink,
    },
  ]

  return <BrowseTable columns={columns} dataUrl="study/" />
}

Studies.propTypes = {}

export default Studies
