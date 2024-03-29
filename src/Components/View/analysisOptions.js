import { Input, Checkbox } from 'antd'
import ChemicalForm from './ChemicalForm'
import SelectOrCreate from '../Forms/SelectOrCreate'
import FunctionSelection from './FunctionSelection'

/**
 * Contains forms for the different analysis options.
 * See src/Forms/Form.js
 */
export const baseAnalysisOptions = {
  None: [],
  'Max Expression': [
    {
      name: 'bg_correction',
      label: 'Std. Devs',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 2,
      renderer: Input,
    },
    {
      name: 'min_biomass',
      label: 'Min. Biomass',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 0.05,
      renderer: Input,
    },
    {
      name: 'biomass_signal',
      label: 'Biomass Signal',
      showLabel: true,
      isFormItem: true,
      renderer: SelectOrCreate,
      url: 'signal/',
      selectionOnly: true,
      rules: [{ required: true }],
    },
    {
      name: 'remove_data',
      label: 'Remove Data',
      showLabel: true,
      valuePropName: 'checked',
      initial_value: false,
      renderer: Checkbox,
    },
  ],
  'Mean Expression': [
    {
      name: 'bg_correction',
      label: 'Std. Devs',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 2,
      renderer: Input,
    },
    {
      name: 'min_biomass',
      label: 'Min. Biomass',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 0.05,
      renderer: Input,
    },
    {
      name: 'biomass_signal',
      label: 'Biomass Signal',
      showLabel: true,
      isFormItem: true,
      renderer: SelectOrCreate,
      url: 'signal/',
      selectionOnly: true,
      rules: [{ required: true }],
    },
    {
      name: 'remove_data',
      label: 'Remove Data',
      showLabel: true,
      valuePropName: 'checked',
      initial_value: false,
      renderer: Checkbox,
    },
  ],
  'Mean Velocity': [
    {
      name: 'pre_smoothing',
      label: 'Initial Smoothing',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 21.0,
      renderer: Input,
    },
    {
      name: 'post_smoothing',
      label: 'Final Smoothing',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 21.0,
      renderer: Input,
    },
  ],
  'Max Velocity': [
    {
      name: 'pre_smoothing',
      label: 'Initial Smoothing',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 21.0,
      renderer: Input,
    },
    {
      name: 'post_smoothing',
      label: 'Final Smoothing',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 21.0,
      renderer: Input,
    },
  ],
  Velocity: [
    {
      name: 'pre_smoothing',
      label: 'Initial Smoothing',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 21.0,
      renderer: Input,
    },
    {
      name: 'post_smoothing',
      label: 'Final Smoothing',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 21.0,
      renderer: Input,
    },
  ],
  'Expression Rate (indirect)': [
    {
      name: 'pre_smoothing',
      label: 'Initial Smoothing',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 21.0,
      renderer: Input,
    },
    {
      name: 'post_smoothing',
      label: 'Final Smoothing',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 21.0,
      renderer: Input,
    },
    {
      name: 'bg_correction',
      label: 'Std. Devs',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 2,
      renderer: Input,
    },
    {
      name: 'min_biomass',
      label: 'Min. Biomass',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 0.05,
      renderer: Input,
    },
    {
      name: 'biomass_signal',
      label: 'Biomass Signal',
      showLabel: true,
      isFormItem: true,
      renderer: SelectOrCreate,
      url: 'signal/',
      selectionOnly: true,
      rules: [{ required: true }],
    },
    {
      name: 'remove_data',
      label: 'Remove Data',
      showLabel: true,
      valuePropName: 'checked',
      initial_value: false,
      renderer: Checkbox,
    },
  ],
  'Expression Rate (direct)': [
    {
      name: 'degr',
      label: 'Reporter Degradation Rate (per hour)',
      type: 'number',
      step: 0.0001,
      rules: [{ required: true }],
      initial_value: 0.0,
      renderer: Input,
    },
    {
      name: 'eps_L',
      label: 'Insignificant Value',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 1e-7,
      renderer: Input,
    },
    {
      name: 'bg_correction',
      label: 'Std. Devs',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 2,
      renderer: Input,
    },
    {
      name: 'min_biomass',
      label: 'Min. Biomass',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 0.05,
      renderer: Input,
    },
    {
      name: 'biomass_signal',
      label: 'Biomass Signal',
      showLabel: true,
      isFormItem: true,
      renderer: SelectOrCreate,
      url: 'signal/',
      selectionOnly: true,
      rules: [{ required: true }],
    },
    {
      name: 'remove_data',
      label: 'Remove Data',
      showLabel: true,
      valuePropName: 'checked',
      initial_value: false,
      renderer: Checkbox,
    },
  ],
  'Expression Rate (inverse)': [
    {
      name: 'degr',
      label: 'Reporter Degradation Rate (per hour)',
      type: 'number',
      step: 0.0001,
      rules: [{ required: true }],
      initial_value: 0.0,
      renderer: Input,
    },
    {
      name: 'eps',
      label: 'Regularization',
      type: 'number',
      step: 0.001,
      rules: [{ required: true }],
      initial_value: 1e-2,
      renderer: Input,
    },
    {
      name: 'n_gaussians',
      label: 'Num. gaussians',
      type: 'integer',
      step: 1,
      rules: [{ required: true }],
      initial_value: 20,
      renderer: Input,
    },
    {
      name: 'bg_correction',
      label: 'Std. Devs',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 2,
      renderer: Input,
    },
    {
      name: 'min_biomass',
      label: 'Min. Biomass',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 0.05,
      renderer: Input,
    },
    {
      name: 'biomass_signal',
      label: 'Biomass Signal',
      showLabel: true,
      isFormItem: true,
      renderer: SelectOrCreate,
      url: 'signal/',
      selectionOnly: true,
      rules: [{ required: true }],
    },
    {
      name: 'remove_data',
      label: 'Remove Data',
      showLabel: true,
      valuePropName: 'checked',
      initial_value: false,
      renderer: Checkbox,
    },
  ],
  Rho: [
    {
      name: 'bg_correction',
      label: 'Std. Devs',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 2,
      renderer: Input,
    },
    {
      name: 'min_biomass',
      label: 'Min. Biomass',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 0.05,
      renderer: Input,
    },
    {
      name: 'biomass_signal',
      label: 'Biomass Signal',
      showLabel: true,
      isFormItem: true,
      renderer: SelectOrCreate,
      url: 'signal/',
      selectionOnly: true,
      rules: [{ required: true }],
    },
    {
      name: 'ref_signal',
      label: 'Reference Signal',
      showLabel: true,
      isFormItem: true,
      renderer: SelectOrCreate,
      url: 'signal/',
      selectionOnly: true,
      rules: [{ required: true }],
    },
    {
      name: 'ndt',
      label: 'Num. Doublings',
      type: 'number',
      initial_value: 2.0,
      rules: [{ required: true }],
      renderer: Input,
    },
    {
      name: 'remove_data',
      label: 'Remove Data',
      showLabel: true,
      valuePropName: 'checked',
      initial_value: false,
      renderer: Checkbox,
    },
  ],
  Alpha: [
    {
      name: 'bg_correction',
      label: 'Std. Devs',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 2,
      renderer: Input,
    },
    {
      name: 'min_biomass',
      label: 'Min. Biomass',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 0.05,
      renderer: Input,
    },
    {
      name: 'biomass_signal',
      label: 'Biomass Signal',
      showLabel: true,
      isFormItem: true,
      renderer: SelectOrCreate,
      url: 'signal/',
      selectionOnly: true,
      rules: [{ required: true }],
    },
    {
      name: 'ndt',
      label: 'Num. Doublings',
      type: 'number',
      initial_value: 2.0,
      rules: [{ required: true }],
      renderer: Input,
    },
    {
      name: 'remove_data',
      label: 'Remove Data',
      showLabel: true,
      valuePropName: 'checked',
      initial_value: false,
      renderer: Checkbox,
    },
  ],
}

export const functionAnalysisOptions = {
  'Induction Curve': [
    {
      name: 'analyte',
      label: 'Chemical',
      renderer: ChemicalForm,
      rules: [{ required: true }],
    },
    {
      name: 'function',
      label: 'Function',
      options: [
        { label: 'Mean Expression', value: 'Mean Expression' },
        { label: 'Max Expression', value: 'Max Expression' },
        { label: 'Rho', value: 'Rho' },
        { label: 'Alpha', value: 'Alpha' },
      ],
      requiresForm: true,
      isFormItem: true,
      renderer: FunctionSelection,
      rules: [{ required: true }],
    },
  ],
  'Heatmap': [
    {
      name: 'analyte1',
      label: 'Chemical 1',
      renderer: ChemicalForm,
      rules: [{ required: true }],
    },
    {
      name: 'analyte2',
      label: 'Chemical 2',
      renderer: ChemicalForm,
      rules: [{ required: true }],
    },
    {
      name: 'function',
      label: 'Function',
      options: [
        { label: 'Mean Expression', value: 'Mean Expression' },
        { label: 'Max Expression', value: 'Max Expression' },
        { label: 'Rho', value: 'Rho' },
        { label: 'Alpha', value: 'Alpha' },
      ],
      requiresForm: true,
      isFormItem: true,
      renderer: FunctionSelection,
      rules: [{ required: true }],
    },
  ],
  Kymograph: [
    {
      name: 'analyte',
      label: 'Chemical',
      renderer: ChemicalForm,
      rules: [{ required: true }],
    },
    {
      name: 'function',
      label: 'Function',
      options: [
        { label: 'Expression Rate (direct)', value: 'Expression Rate (direct)' },
        { label: 'Expression Rate (indirect)', value: 'Expression Rate (indirect)' },
      ],
      requiresForm: true,
      isFormItem: true,
      renderer: FunctionSelection,
      rules: [{ required: true }],
    },
  ],
}

export default { ...baseAnalysisOptions, ...functionAnalysisOptions }
