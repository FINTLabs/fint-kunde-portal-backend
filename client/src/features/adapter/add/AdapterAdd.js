import React from "react";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, withStyles,} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {Add} from "@material-ui/icons";
import UsernameValidationInput from "../../../common/input-validation/UsernameValidationInput";
import AdapterApi from "../../../data/api/AdapterApi";

const styles = () => ({
  addButton: {
    margin: 0,
    top: 100,
    left: 'auto',
    bottom: 'auto',
    right: 50,
    position: 'fixed',
  }

});

class AdapterAdd extends React.Component {
  updateAdapterState = (event) => {
    const field = event.target.name;
    const adapter = this.state.adapter;
    adapter[field] = event.target.value;
    return this.setState({adapter: adapter});
  };

  handleAddAdapter = () => {

    AdapterApi.createAdapter(this.state.adapter, this.props.organisation.name)
      .then(response => {
        if (response.status === 201) {
          this.props.afterAdd();
          this.props.notify("Adapteret ble opprettet");
        }
        else if (response.status === 302) {
          this.props.notify(`Adapteret "${this.state.adapter.name}" finnes fra før av. `);
        }
        else {
          this.props.notify("Oisann, dette gikk ikke helt etter planen! Prøv igjen ;)");
        }
        this.setState({
          showAdapterAdd: false,
          notify: true,
          adapter: this.getEmptyAdapter(),
        });
      })
      .catch(() => {
        this.props.notify("Oisann, dette gikk ikke helt etter planen! Prøv igjen ;)");
      });
  };

  usernameIsValid = (valid) => {
    this.setState({usernameIsValid: valid});
  };

  openAddDialog = () => {
    this.setState({showAdapterAdd: true, notify: false});
  };

  handleCancel = () => {
    this.setState({showAdapterAdd: false, notify: false});
  };

  /*
  onCloseNotification = () => {
    this.setState({
      notify: false,
    });
  };
  */

  getEmptyAdapter = () => {
    return {
      name: '',
      shortDescription: '',
      note: '',
    };
  };
  isFormValid = () => {
    return (this.state.usernameIsValid && this.state.adapter.shortDescription.length > 0 && this.state.adapter.note.length > 0)
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      adapter: this.getEmptyAdapter(),
      showAdapterAdd: false,
      usernameIsValid: false,
    };
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <div>
          <Button variant="fab" color="secondary" className={classes.addButton}
                  onClick={this.openAddDialog}><Add/></Button>
          <Dialog
            open={this.state.showAdapterAdd}
            onClose={this.handleAddAdapter}
            aria-labelledby="form-dialog-title"
            maxWidth="md"
          >
            <DialogTitle id="form-dialog-title">Nytt adapter</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Vennligst fyll ut de obligatoriske feltene for å legge til ny adapter.
              </DialogContentText>
              <UsernameValidationInput
                title="Brukernavn"
                name="name"
                onChange={this.updateAdapterState}
                usernameIsValid={this.usernameIsValid}
              />
              <TextField
                name="shortDescription"
                label="Kort beskrivelse"
                required
                fullWidth
                onChange={this.updateAdapterState}
              />
              <TextField
                name="note"
                label="Note"
                fullWidth
                required
                multiline
                rows="4"
                onChange={this.updateAdapterState}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCancel} variant="raised" color="primary">
                Avbryt
              </Button>
              <Button disabled={!this.isFormValid()} onClick={this.handleAddAdapter} variant="raised" color="primary">
                Legg til
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    )
  }
}


AdapterAdd.propTypes = {};

export default withStyles(styles)(AdapterAdd);







