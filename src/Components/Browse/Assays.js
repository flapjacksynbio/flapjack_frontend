import React from 'react'
import api from '../../api'
import { Table } from 'antd'
const { Column } = Table

const Assays = () => {
  const [dataSource, setDataSource] = React.useState('')

  React.useEffect(() => {
    api.get('assay').then(data => {
      const parsed = data.map((d, i) => ({ ...d, key: i }))
      parsed.push({
        name: '123',
        description: '',
        study: 1,
        temperature: 28,
        key: 1
      })
      setDataSource(parsed)
    })
  }, [])

  return (
    <div>
      <Table dataSource={dataSource}>
        <Column title="Name" dataIndex="name" key="name" sorter={(a, b) => a.name.localeCompare(b.name)} />
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="Study" dataIndex="study" key="study" sorter={(a, b) => a.name.localeCompare(b.name)} />
        <Column title="Temperature" dataIndex="temperature" key="temperature" sorter={(a, b) => a - b} render={temp => `${temp} °C`} />
        <Column title="Machine" dataIndex="machine" key="machine" sorter={(a, b) => a.name.localeCompare(b.name)} />
      </Table>
    </div>
  )
}

Assays.propTypes = {}

export default Assays
