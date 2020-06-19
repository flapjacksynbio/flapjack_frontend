import React from 'react'
import { useLocation } from 'react-router-dom'
import { Tabs, Empty } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import AddTab from './AddTab'
import DataView from './DataView'

const View = () => {
  const location = useLocation()
  const [tabs, setTabs] = React.useState([])
  const [dataTabCount, setDataTabCount] = React.useState(0)
  const [analysisTabCount, setAnalysisTabCount] = React.useState(0)
  const [activeKey, setActiveKey] = React.useState(null)

  const onRenameTab = (name, tab_key) => {
    setTabs((oldTabs) => {
      const tabIndex = oldTabs.findIndex(({ key }) => key === tab_key)
      if (tabIndex === -1) return oldTabs

      const otherTabs = [...oldTabs]
      otherTabs[tabIndex].title = name
      return otherTabs
    })
  }

  React.useEffect(() => {
    const validTab = tabs.find(({ key }) => key === activeKey)
    if (!tabs.length) {
      setActiveKey(null)
    } else if (activeKey === null || !validTab) {
      setActiveKey(tabs[tabs.length - 1].key)
    }
  }, [tabs, activeKey])

  React.useEffect(() => {
    const { tabType } = location
    if (tabType) {
      onAddTab(tabType)
    }
    // eslint-disable-next-line
  }, [])

  const onAddTab = (type) => {
    let i, name

    if (type === 'data') {
      i = dataTabCount + 1
      name = 'Data'
      setDataTabCount(i)
    } else {
      i = analysisTabCount + 1
      name = 'Analysis'
      setAnalysisTabCount(i)
    }

    const title = `${name} ${i}`
    const key = `${tabs.length}`

    const contentProps = {
      onRename: (name) => onRenameTab(name, key),
      isAnalysis: type !== 'data',
    }

    setTabs((tabs) => [
      ...tabs,
      {
        title,
        key,
        content: DataView,
        contentProps,
        closable: true,
      },
    ])
  }

  const onRemoveTab = (targetKey) => {
    setTabs((tabs) => tabs.filter(({ key }) => key !== targetKey))
  }

  const onTabEdit = (targetKey, action) => {
    if (action === 'add') {
      onAddTab()
    } else {
      onRemoveTab(targetKey)
    }
  }

  const renderAddTab = (
    <AddTab actions={[() => onAddTab('data'), () => onAddTab('analysis')]} />
  )

  return (
    <>
      <Tabs
        onChange={setActiveKey}
        activeKey={activeKey}
        type="editable-card"
        hideAdd
        onEdit={onTabEdit}
        tabBarExtraContent={renderAddTab}
      >
        {tabs.map(({ content: Content, contentProps, ...tab }) => (
          <Tabs.TabPane
            tab={tab.title}
            key={tab.key}
            closable={tab.closable}
            closeIcon={<CloseOutlined />}
          >
            <Content title={tab.title} {...contentProps} />
          </Tabs.TabPane>
        ))}
      </Tabs>
      {activeKey === null && (
        <Empty description="No plots have been created.">{renderAddTab}</Empty>
      )}
    </>
  )
}

View.propTypes = {}

export default View
