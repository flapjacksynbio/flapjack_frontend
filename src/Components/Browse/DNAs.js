import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
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

  const renderViewLink = (text, record) => (
    <Link
      to={{
        pathname: '/view',
        dna: { id: record.id, name: record.name },
        tabType: 'data',
      }}
    >
      <Button>View DNA</Button>
    </Link>
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
      render: renderViewLink,
    },
  ]

  return <BrowseTable dataUrl="dna/" columns={columns} />
}

DNAs.propTypes = {}

export default DNAs
