import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {FieldType, registerType} from 'simple-react-form'
import _ from 'underscore'

const propTypes = {
  ...FieldType.propTypes,
  /**
   * Optional default value.
   */
  defaultValue: React.PropTypes.string,
  /**
   * The options for the select input. Each item must have label and value.
   */
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]).isRequired
  }))
}

const defaultProps = {
}

export default class SelectComponent extends React.Component {
  constructor(props) {
    super(props)
    this._options = this._getOptions()
    this._menuItems = this._options.map((item) => {
      return <MenuItem key={item.value} value={String(item.value)} primaryText={item.label} onTouchTap={(value)=>props.onChange(item.value)}/>
    })
  }

  _getOptions () {
    if (this.props.options) {
      return this.props.options
    } else if (this.props.fieldSchema.allowedValues) {
      return _.map(this.props.fieldSchema.allowedValues, function (allowedValue) {
        return {
          label: allowedValue,
          value: allowedValue
        }
      })
    } else {
      throw new Error('You must set the options for the select field')
    }
  }
  _getDefaultValue () {
    if (this.props.defaultValue) {
      return this.props.defaultValue
    } else if (this.props.fieldSchema.defaultValue) {
      return this.props.fieldSchema.defaultValue
    }
  }

  componentDidMount() {
    if (!this.props.value) {
      this.props.onChange(this._getDefaultValue())
    }
  }

  render () {

    return (
        <SelectField
            value={String(this.props.value)}
            defaultValue={this._getDefaultValue()}
            fullWidth
            disabled={this.props.disabled}
            floatingLabelText={this.props.label}
            errorText={this.props.errorMessage}
            {...this.props.passProps}>
          {this._menuItems}
        </SelectField>
    )
  }
}

SelectComponent.propTypes = propTypes
SelectComponent.defaultProps = defaultProps

registerType({
  type: 'select',
  component: SelectComponent
})
