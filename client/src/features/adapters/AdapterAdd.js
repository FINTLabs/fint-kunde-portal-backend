import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {Add} from "material-ui-icons";
import {withStyles} from "material-ui";
import AutoHideNotification from "../../common/AutoHideNotification";
import PropTypes from 'prop-types';
import {createAdapter} from "../../data/redux/dispatchers/adapter";

const styles = theme => ({
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
  constructor(props, context) {
    super(props, context);
    this.state = {
      adapter: {},
      showAdapterAdd: false,
      adapterAdded: false,
      adapterAddedName: null,
    };
  }


  updateAdapterState = (event) => {

    const field = event.target.name;

    const adapter = this.state.adapter;
    adapter[field] = event.target.value;
    return this.setState({adapter: adapter});
  };

  handleClose = () => {
    this.props.createAdapter(this.state.adapter, this.context.organisation).then(() => {
      this.setState({
        adapterAdded: false,
        adapterAddedName: null,
      })
    });

    this.setState({
      showAdapterAdd: false,
      adapterAdded: true,
      adapterAddedName: this.state.adapter.name,
    });
  };

  openAddDialog = () => {
    this.setState({showAdapterAdd: true, adapterAdded: false});
  };

  handleCancel = () => {
    this.setState({showAdapterAdd: false, adapterAdded: false});
  };

  static contextTypes = {
	    organisation: PropTypes.string,
	    components: PropTypes.array
 };
  render() {
    const {classes} = this.props;
    return (
      <div>
        <AutoHideNotification
          showNotification={this.state.adapterAdded}
          message={`Adapter ${this.state.adapterAddedName} ble lagt til!`}
        />
        <div>
          <Button variant="fab" color="secondary" className={classes.addButton}
                  onClick={this.openAddDialog}><Add/></Button>
          <Dialog
            open={this.state.showAdapterAdd}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Ny Adapter</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Vennligst fyll ut de obligatoriske feltene for å legge til ny klient
              </DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                required
                name="name"
                label="Adapter Navn"
                fullWidth
                onChange={this.updateAdapterState}
              />

              <TextField
                name="shortDescription"
                label="Kort beskrivelse"
                fullWidth
                onChange={this.updateAdapterState}
              />

              <TextField
                name="note"
                label="Note"
                fullWidth
                multiline
                rows="4"
                onChange={this.updateAdapterState}
              />
              </DialogContent>
              <DialogActions>
              <Button onClick={this.handleCancel} color="primary" style={{textTransform: 'none'}}>
                Avbryt
              </Button>
              <Button onClick={this.handleClose} color="primary" style={{textTransform: 'none'}}>
                Legg til
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    )
  }
}


AdapterAdd.propTypes = {

};

export default withStyles(styles)(AdapterAdd);












