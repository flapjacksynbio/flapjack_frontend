import React from 'react'
import api from '../../api'
import { Table, Input } from 'antd'
import './Browse.scss'
const { Column } = Table

const DNAs = () => {
  const [dataSource, setDataSource] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [pagination, setPagination] = React.useState({ current: 1, pageSize: 100, total: 0 })

  React.useEffect(() => {
    loadData({ page: 1 })
  }, [])

  const loadData = async (query) => {
    setLoading(true)
    const { count: total, results: data} = await api.get('dna/', {}, query)
    const parsed = data.map(d => ({ ...d, key: d.id }))
    setDataSource(parsed)
    setPagination(pag => ({ ...pag, total, current: query.page || pag.current }))
    setLoading(false)
  }

  const handleTableChange = ({ current }, search) => {
    loadData({
      page: current,
      name: search
    })
  }

  return (
    <div>
      <div className='search-bar'>
        <Input.Search enterButton loading={loading} onSearch={val => handleTableChange(pagination, val)} />
      </div>
      <Table
        dataSource={dataSource}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      >
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
