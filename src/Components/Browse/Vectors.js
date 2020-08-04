import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Space } from 'antd'
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
    const handleViewClick = () => {
      // Redirect to View screen with selected parameters
      history.push({
        pathname: '/view',
        state: { vector: { id: record.id, name: record.name } },
      })
    }

    return (
      <Space>
        <Button onClick={handleViewClick}>Data Viewer</Button>
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
