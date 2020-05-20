import React from 'react'
import api from '../../api'
import { Table } from 'antd'
const { Column } = Table

const DNAs = () => {
  const [dataSource, setDataSource] = React.useState('')

  React.useEffect(() => {
    api.get('dna').then(data => {
      const parsed = data.map(d => ({ ...d, key: d.url }))
      setDataSource(parsed)
    })
  }, [])

  return (
    <div>
      <Table dataSource={dataSource}>
        <Column title="Names" dataIndex="names" key="names" render={names => names.join(', ')} />
        <Column
          title="Sbol Uris"
          dataIndex="sboluris"
          key="sboluris"
          render={uris => (
            <div style={{ display: 'block' }}>
              {uris.map((uri, i) => <div key={i}><a href={uri}>{uri}</a></div>)}
            </div>
          )} />
      </Table>
    </div>
  )
}

DNAs.propTypes = {}

export default DNAs
