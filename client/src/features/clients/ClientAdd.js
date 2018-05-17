import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {Add} from "material-ui-icons";
import {withStyles} from "material-ui";
import AutoHideNotification from "../../common/AutoHideNotification";

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

class ClientAdd extends React.Component {
  updateKlientState = (event) => {

    const field = event.target.name;

    const client = this.state.client;
    client[field] = event.target.value;
    return this.setState({client: client});
  };
  handleClose = () => {
    this.props.createClient(this.state.client).then(() => {
      this.setState({
        clientAdded: false,
        clientAddedName: null,
      })
    });

    this.setState({
      showClientAdd: false,
      clientAdded: true,
      clientAddedName: this.state.client.name,
    });
  };
  openAddDialog = () => {
    this.setState({showClientAdd: true, clientAdded: false});
  };
  handleCancel = () => {
    this.setState({showClientAdd: false, clientAdded: false});
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      client: {},
      showClientAdd: false,
      clientAdded: false,
      clientAddedName: null,
    };
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <AutoHideNotification
          showNotification={this.state.clientAdded}
          message={`Klient ${this.state.clientAddedName} ble lagt til!`}
        />
        <div>
          <Button variant="fab" color="secondary" className={classes.addButton}
                  onClick={this.openAddDialog}><Add/></Button>
          <Dialog
            open={this.state.showClientAdd}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Ny klient</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Vennligst fyll ut de obligatoriske feltene for å legge til ny klient
              </DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                required
                name="name"
                label="Navn"
                fullWidth
                onChange={this.updateKlientState}
              />

              <TextField
                name="shortDescription"
                label="Kort beskrivelse"
                required
                fullWidth
                onChange={this.updateKlientState}
              />

              <TextField
                name="note"
                label="Note"
                fullWidth
                required
                multiline
                rows="4"
                onChange={this.updateKlientState}
              />


            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCancel} variant="raised" color="primary" style={{textTransform: 'none'}}>
                Avbryt
              </Button>
              <Button onClick={this.handleClose} variant="raised" color="primary" style={{textTransform: 'none'}}>
                Legg til
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    )
  }
}


ClientAdd.propTypes = {};

export default withStyles(styles)(ClientAdd);







