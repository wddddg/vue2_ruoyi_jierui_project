import jerehButton from './button/index'
import jerehInput from './input/index'
import jerehPersonSelect from './person-select/index'
import jerehDatePicker from './date-picker/index'
import jerehSelect from './select/index'

const components = [
  jerehButton,
  jerehInput,
  jerehPersonSelect,
  jerehDatePicker,
  jerehSelect
]
const install = function(Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install,
  jerehButton,
  jerehInput,
  jerehPersonSelect,
  jerehDatePicker,
  jerehSelect
}
