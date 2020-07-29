import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { Collapse, Button, Layout, message, Form } from 'antd'
import ProviderSelection from './ProviderSelection'
import PlotOptions from './PlotOptions'
import AnalysisSelection from './AnalysisSelection'
import api from '../../api'

/** Renders the query form for plot creation */
const Selection = ({ isAnalysis = false, onSubmit }) => {
  const location = useLocation()

  // Query
  const [selectedStudies, setSelectedStudies] = React.useState([])
  const [selectedAssays, setSelectedAssays] = React.useState([])
  const [selectedDna, setSelectedDna] = React.useState([])

  const [analysisForm] = Form.useForm()

  // Set initial values based on url query parameters
  React.useEffect(() => {
    if (location.state) {
      const { study, assay, dna } = location.state
      if (study) setSelectedStudies([study])
      if (assay) setSelectedAssays([assay])
      if (dna) setSelectedDna([dna])
      location.state = {}
    }
  }, [location])

  const addSelected = (value, checked, setSelected) => {
    if (checked) {
      setSelected((selected) => [...selected.filter(({ id }) => id !== value.id), value])
    } else {
      setSelected((selected) => selected.filter(({ id }) => id !== value.id))
    }
  }

  // Select a study an all related assays
  const setStudiesAndChildAssays = async (value, checked) => {
    addSelected(value, checked, setSelectedStudies)
    if (!checked) return

    api
      .get('assay', null, {
        study: value.id,
      })
      .then(({ results }) =>
        results.reduce((acc, value) => {
          return { ...acc, [value.id]: value }
        }, {}),
      )
      .then((res) =>
        Promise.all(
          Object.entries(res).forEach(([id, value]) =>
            setAssaysAndChildDNA({ id: +id, name: value.name }, true),
          ),
        ),
      )
      .catch(() => null)
  }

  const setAssaysAndChildDNA = async (value, checked) => {
    addSelected(value, checked, setSelectedAssays)
    if (!checked) return

    api
      .get('dna', null, { assays: value.id })
      .then(({ results }) =>
        results.reduce((acc, value) => {
          value.name = value.names.join(', ')
          return { ...acc, [value.id]: value }
        }, {}),
      )
      .then((res) =>
        setSelectedDna((selected) => [
          ...selected.filter(({ id }) => !res[id]),
          ...Object.values(res),
        ]),
      )
      .catch(() => null)
  }

  const queryFields = [
    {
      url: 'study',
      label: 'studies',
      header: 'Studies',
      selected: selectedStudies,
      _selectedSetter: setSelectedStudies,
      setSelected: setStudiesAndChildAssays,
    },
    {
      url: 'assay',
      label: 'assays',
      header: 'Assays',
      selected: selectedAssays,
      _selectedSetter: setSelectedAssays,
      setSelected: setAssaysAndChildDNA,
    },
    {
      url: 'dna',
      label: 'DNAs',
      header: 'DNA',
      selected: selectedDna,
      _selectedSetter: setSelectedDna,
      setSelected: (value, checked) => addSelected(value, checked, setSelectedDna),
    },
  ]

  // Plot Options
  const [normalize, setNormalize] = React.useState('None')
  const [tabs, setTabs] = React.useState('Study')
  const [subplots, setSubplots] = React.useState('Name')
  const [markers, setMarkers] = React.useState('DNA')
  const [plot, setPlot] = React.useState('Mean +/- std')

  const plotOptionsFields = [
    {
      name: 'Normalize',
      options: ['Temporal Mean', 'Mean/std', 'Min/Max', 'None'],
      selected: normalize,
      setSelected: setNormalize,
      defaultValue: 'None',
    },
    {
      name: 'Tabs',
      options: ['Study', 'Assay', 'DNA', 'Media', 'Strain', 'Chemical', 'Name'],
      selected: tabs,
      setSelected: setTabs,
      defaultValue: 'Study',
    },
    {
      name: 'Subplots',
      options: ['Study', 'Assay', 'DNA', 'Media', 'Strain', 'Chemical', 'Name'],
      selected: subplots,
      setSelected: setSubplots,
      defaultValue: 'Name',
    },
    {
      name: 'Lines/Markers',
      options: ['Study', 'Assay', 'DNA', 'Media', 'Strain', 'Chemical', 'Name'],
      selected: markers,
      setSelected: setMarkers,
      defaultValue: 'DNA',
    },
    {
      name: 'Plot',
      options: ['Mean', 'Mean +/- std', 'All data points'],
      selected: plot,
      setSelected: setPlot,
      defaultValue: 'Mean +/- std',
    },
  ]

  const renderClear = (selected, setter) => (
    <Button
      disabled={!selected.length}
      onClick={(e) => {
        e.stopPropagation()
        setter([])
      }}
      size="small"
      type="danger"
    >
      Clear
    </Button>
  )

  const onPlot = async () => {
    // TODO: Uncomment next line when arguments become relevant
    // if (!selectedStudies.length || !selectedAssays.length || !selectedDna.length) {
    //   message.error('Please select data to plot.')
    //   return
    // }

    let form = {
      studyIds: selectedStudies.map(({ id }) => id),
      assayIds: selectedAssays.map(({ id }) => id),
      dnaIds: selectedDna.map(({ id }) => id),
      plotOptions: { normalize, tabs, subplots, markers, plot },
    }

    console.log(selectedStudies)

    if (isAnalysis) {
      const analysis_values = await analysisForm.validateFields().catch(() => {
        message.error('Please fill the fields in the analysis form.')
        return null
      })

      if (!analysis_values) return
      form = { ...form, analysis: analysis_values }
    }

    onSubmit(form)
  }

  return (
    <Layout>
      <Layout.Content>
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header="Query" key="1">
            <Collapse>
              {queryFields.map((field) => (
                <Collapse.Panel
                  key={field.label}
                  header={field.header}
                  extra={renderClear(field.selected, field._selectedSetter)}
                >
                  <ProviderSelection {...field} />
                </Collapse.Panel>
              ))}
            </Collapse>
          </Collapse.Panel>
          {isAnalysis && (
            <Collapse.Panel header="Analysis" key="2" forceRender>
              <AnalysisSelection formInstance={analysisForm} />
            </Collapse.Panel>
          )}
          <Collapse.Panel header="Plot Options" key="3">
            <PlotOptions fields={plotOptionsFields} />
          </Collapse.Panel>
        </Collapse>
      </Layout.Content>
      <Layout.Footer style={{ padding: 0 }}>
        <Button type="primary" onClick={onPlot} block>
          Plot
        </Button>
      </Layout.Footer>
    </Layout>
  )
}

Selection.propTypes = {
  isAnalysis: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
}

export default Selection
