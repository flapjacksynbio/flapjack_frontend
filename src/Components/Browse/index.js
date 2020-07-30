import React from 'react'
import { Tabs, BackTop } from 'antd'
import Studies from './Studies'
import Assays from './Assays'
import Vectors from './Vectors'

const Browse = () => {
  return (
    <>
      <BackTop />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Studies" key="1">
          <Studies />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Assays" key="2">
          <Assays />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Vectors" key="3">
          <Vectors />
        </Tabs.TabPane>
      </Tabs>
    </>
  )
}

Browse.propTypes = {}

export default Browse
