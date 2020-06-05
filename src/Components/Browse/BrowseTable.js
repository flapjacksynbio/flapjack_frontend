import React from 'react'
import PropTypes from 'prop-types'
import { Table, Input } from 'antd'
import api from '../../api'
import './Browse.scss'

const BrowseTable = ({
  dataUrl,
  columns,
}) => {
  const [dataSource, setDataSource] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [pagination, setPagination] = React.useState({ current: 1, pageSize: 20, total: 0, hideOnSinglePage: true })

  const loadData = async (query) => {
    setLoading(true)
    const { count: total, results: data} = await api.get(dataUrl, {}, query)

    setDataSource(data)
    setPagination(pag => ({
      ...pag,
      total,
    }))

    setLoading(false)
  }

  // eslint-disable-next-line
  React.useEffect(() => { loadData({ page: 1 }) }, [])

  const handleTableChange = ({ current, pageSize }, search) => {
    setPagination(pag => ({ ...pag, pageSize, current }))
    const query = { limit: pageSize, offset: pageSize * (current - 1) }
    if (typeof search === 'string') query.search = search
    loadData(query)
  }

  return (
    <div>
      <div className='search-bar'>
        <Input.Search placeholder="Search" enterButton loading={loading} onSearch={val => handleTableChange(pagination, val)} />
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  )
}

BrowseTable.propTypes = {
  dataUrl: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
      key: PropTypes.string,
      sorter: PropTypes.func,
    })
  )
}

export default BrowseTable
