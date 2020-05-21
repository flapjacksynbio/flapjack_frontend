import React from 'react'
import BrowseTable from './BrowseTable'

const DNAs = () => {
  const renderUris = uris => (
    <div style={{ display: 'block' }}>
      {uris.map((uri, i) => <div key={i}><a href={uri}>{uri}</a></div>)}
    </div>
  )

  const columns = [
    {
      title: 'Names',
      dataIndex: 'names',
      render: names => names.join(', ')
    },
    {
      title: 'Sbol Uris',
      dataIndex: 'sboluris',
      render: renderUris
    }
  ]

  return (
    <BrowseTable
      dataUrl="dna/"
      columns={columns}
    />
  )
}

DNAs.propTypes = {}

export default DNAs
