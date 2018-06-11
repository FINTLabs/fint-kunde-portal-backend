import React from "react";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {Add} from "@material-ui/icons";
import {withStyles} from "@material-ui/core";
import AutoHideNotification from "../../../common/AutoHideNotification";
import UsernameValidationInput from "../../../common/UsernameValidationInput";

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

class AssetAdd extends React.Component {
  updateAssetState = (event) => {

    const field = event.target.name;

    const asset = this.state.asset;
    asset[field] = event.target.value;
    return this.setState({asset: asset});
  };

  handleAddAsset = () => {
    this.props.createAsset(this.state.asset).then(() => {
      this.setState({
        showAssetAdd: false,
        notify: true,
        assetAddedName: this.state.asset.name,
        asset: this.getEmptyAsset(),
      });
    });

  };

  usernameIsValid = (valid) => {
    this.setState({usernameIsValid: valid});
  };

  openAddDialog = () => {
    this.setState({showAssetAdd: true, notify: false});
  };

  handleCancel = () => {
    this.setState({showAssetAdd: false, notify: false});
  };

  onCloseNotification = () => {
    this.setState({
      notify: false,
    });
  };

  getEmptyAsset = () => {
    return {
      name: '',
      shortDescription: '',
      note: '',
    };
  };
  isFormValid = () => {
    return (this.state.usernameIsValid && this.state.asset.shortDescription.length > 0 && this.state.asset.note.length > 0)
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      asset: this.getEmptyAsset(),
      showAssetAdd: false,
      assetAddedName: null,
      notify: false,
      usernameIsValid: false,
    };
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <AutoHideNotification
          showNotification={this.state.notify}
          message={`Asset ${this.state.assetAddedName} ble lagt til!`}
          onClose={this.onCloseNotification}
        />
        <div>
          <Button variant="fab" color="secondary" className={classes.addButton}
                  onClick={this.openAddDialog}><Add/></Button>
          <Dialog
            open={this.state.showAssetAdd}
            onClose={this.handleAddAsset}
            aria-labelledby="form-dialog-title"
            maxWidth="md"
          >
            <DialogTitle id="form-dialog-title">Nytt asset</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Vennligst fyll ut de obligatoriske feltene for å legge til ny asset.
              </DialogContentText>
              <UsernameValidationInput
                title="Brukernavn"
                name="name"
                onChange={this.updateAssetState}
                usernameIsValid={this.usernameIsValid}
              />
              <TextField
	              name="name"
	              label="Name"
	              fullWidth
	              required
	              onChange={this.updateAssetState}
            />
              <TextField
                name="description"
                label="Beskrivelse"
                required
                fullWidth
                onChange={this.updateAssetState}
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCancel} variant="raised" color="primary">
                Avbryt
              </Button>
              <Button disabled={!this.isFormValid()} onClick={this.handleAddAsset} variant="raised" color="primary">
                Legg til
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    )
  }
}


AssetAdd.propTypes = {};

export default withStyles(styles)(AssetAdd);







