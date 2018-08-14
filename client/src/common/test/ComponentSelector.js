import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";


class ComponentSelector extends Component {

  render() {
    const {name, value, components} = this.props;
    return (
      <div>
        <FormControl fullWidth required>
          <InputLabel htmlFor={name}>Komponent</InputLabel>
          <Select
            value={value}
            onChange={this.props.handleChange}
            input={<Input name={name} id={name}/>}
          >
            {components.map(component => {
              return (
                <MenuItem key={component.dn} value={component.basePath}>{component.description}</MenuItem>
              );
            })}

          </Select>
        </FormControl>
      </div>
    );
  }

}

ComponentSelector.propTypes = {
  classes: PropTypes.any,
  components: PropTypes.any.isRequired,
  handleChange: PropTypes.any.isRequired,
  name: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default ComponentSelector;
