import React from "react";
import {FormControl, FormHelperText, Input, InputLabel, withStyles} from "@material-ui/core";
import PropTypes from "prop-types";


const styles = () => {
};

class UsernameValidationInput extends React.Component {

  onChangeUsername = (event) => {
    let username = event.target.value;
    let usernameValidator = new RegExp("^[a-zA-Z0-9_-]{3,128}$");
    let valid = usernameValidator.test(username);

    this.setState({
      usernameValid: valid,
    });

    this.props.usernameIsValid(valid);
    this.props.onChange(event);

  };

  constructor(props) {
    super(props);
    this.state = {
      usernameValid: true,

    };
  }

  render() {
    const {name, title} = this.props;
    return (
      <FormControl fullWidth error={!this.state.usernameValid} required>
        <InputLabel htmlFor="password">{title}</InputLabel>
        <Input
          autoFocus
          fullWidth
          name={name}
          onChange={this.onChangeUsername}
        />
        <FormHelperText>{this.state.usernameValid ? '' : 'Brukernavnet kan bare inneholde a-z, A-Z, 0-9, - og _. Det kan fra 3-128 tegn langt.'}</FormHelperText>
      </FormControl>
    );
  }
}

UsernameValidationInput.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  usernameIsValid: PropTypes.func.isRequired,
};
export default withStyles(styles)(UsernameValidationInput);
