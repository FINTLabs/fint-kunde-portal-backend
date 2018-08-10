import React, {Component} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import PropTypes from "prop-types";

class EnvironmentSelector extends Component {
  render() {
    const {name, value} = this.props;

    return (
      <div>
        <FormControl fullWidth required>
          <InputLabel htmlFor={name}>Miljø</InputLabel>
          <Select
            value={value}
            onChange={this.props.handleChange}
            input={<Input name={name} id={name}/>}
          >
            <MenuItem value="https://play-with-fint.felleskomponent.no">Play-With-FINT</MenuItem>
            <MenuItem value="https://beta.felleskomponent.no">Beta</MenuItem>
            <MenuItem value="https://api.felleskomponent.no">Produksjon</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

EnvironmentSelector.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default EnvironmentSelector;
