import React from 'react'
import { Tabs } from 'antd'
import Studies from './Studies'
import Assays from './Assays'
import DNAs from './DNAs'

const Browse = () => {
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Studies" key="1">
        <Studies />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Assays" key="2">
        <Assays />
      </Tabs.TabPane>
      <Tabs.TabPane tab="DNAs" key="3">
        <DNAs />
      </Tabs.TabPane>
    </Tabs>
  )
}

Browse.propTypes = {}

export default Browse
