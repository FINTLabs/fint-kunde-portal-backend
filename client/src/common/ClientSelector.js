import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";


const styles = (theme) => ({
  clientWarning: {
    color: theme.palette.primary.main,
  },
});

class ClientSelector extends Component {

  render() {
    const {name, value, clients, classes, disabled} = this.props;
    console.log(clients);
    let selectableClients = clients.filter(c => c.assetId !== null);
    console.log(selectableClients);
    return (
      <div>

        <FormControl
          className={classes.formControl}
          fullWidth
          disabled={disabled}
        >
          <InputLabel htmlFor={name}>Klient</InputLabel>
          <Select
            value={value}
            onChange={this.props.handleChange}
            input={<Input name={name} id={name}/>}
          >
            {selectableClients.map(client => {
              return (
                <MenuItem key={client.dn} value={client.dn}>{client.shortDescription}</MenuItem>
              );
            })}
          </Select>
          <FormHelperText className={classes.clientWarning}>Bruk en egen klient for testing. Passordet blir regenerert hver gang du kjører en test.</FormHelperText>
        </FormControl>

      </div>
    );
  }
}

ClientSelector.propTypes = {
  classes: PropTypes.object,
  clients: PropTypes.any.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default withStyles(styles)(ClientSelector);
