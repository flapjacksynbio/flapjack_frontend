import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Space } from 'antd'
import BrowseTable from './BrowseTable'

const DNAs = () => {
  const renderUris = (uris) => (
    <div style={{ display: 'block' }}>
      {uris.map((uri, i) => (
        <div key={i}>
          <a href={uri}>{uri}</a>
        </div>
      ))}
    </div>
  )

  const renderActions = (text, record) => (
    <Space>
      <Link
        to={{
          pathname: '/view',
          dna: { id: record.id, name: record.name },
          tabType: 'data',
        }}
      >
        <Button>View DNA</Button>
      </Link>
      <Link
        to={{
          pathname: '/view',
          dna: { id: record.id, name: record.name },
          tabType: 'analysis',
        }}
      >
        <Button>Analyze DNA</Button>
      </Link>
    </Space>
  )

  const columns = [
    {
      title: 'Names',
      dataIndex: 'names',
      render: (names) => names.join(', '),
    },
    {
      title: 'Sbol Uris',
      dataIndex: 'sboluris',
      render: renderUris,
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: renderActions,
    },
  ]

  return <BrowseTable dataUrl="dna/" columns={columns} />
}

DNAs.propTypes = {}

export default DNAs
