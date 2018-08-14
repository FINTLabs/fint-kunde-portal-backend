import React from "react";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {Add} from "@material-ui/icons";
import {withContext} from "../../data/context/withContext";
import AssetNameValidationInput from "../../common/input-validation/AssetNameValidationInput";


const styles = (theme) => ({
  addButton: {
    margin: 0,
    top: 100,
    left: 'auto',
    bottom: 'auto',
    right: 50,
    position: 'fixed',
  },
  assetName: {
    width: '55%',
  },
  primaryAssetId: {
    width: '45%',
  },
  dialog: {
    //width: '50%',
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
    this.props.createAsset(this.state.asset, this.props.organisation).then(() => {
      this.props.notify(`Ressursen '${this.state.asset.description}' ble lagt til!`);
      this.props.fetchAssets(this.props.context.currentOrganisation.name);
      this.setState({
        showAssetAdd: false,
        asset: this.getEmptyAsset(),
        assetAdded: true,
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

  getEmptyAsset = () => {
    return {
      name: '',
      description: '',
    };
  };

  nameIsValid = (valid) => {
    this.setState({nameIsValid: valid});
  };

  isFormValid = () => {
    return (this.state.nameIsValid && this.state.asset.description.length > 0)
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      asset: this.getEmptyAsset(),
      showAssetAdd: false,
      assetAdded: false,
      usernameIsValid: false,
    };

  }


  componentDidUpdate(prevState) {
    if (prevState.assetAdded === true) {
      this.props.fetchAssets(this.props.organisation.name);
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <div>
          <Button variant="fab" color="secondary" className={classes.addButton}
                  onClick={this.openAddDialog}><Add/></Button>
          <Dialog
            open={this.state.showAssetAdd}
            onClose={this.handleAddAsset}
            aria-labelledby="form-dialog-title"
            maxWidth="md"
            className={classes.dialog}
          >
            <DialogTitle id="form-dialog-title">Ny ressurs</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Vennligst fyll ut de obligatoriske feltene for å legge til ny ressurs.
              </DialogContentText>
              <AssetNameValidationInput
                className={classes.assetName}
                name="name"
                title="Navn (f.eks. las eller skole.las)"
                onChange={this.updateAssetState}
                assetNameIsValid={this.nameIsValid}
              />
              <TextField
                className={classes.primaryAssetId}
                label={`.${this.props.primaryAssetId}`}
                disabled
                InputProps={{
                  disableUnderline: true,
                }}
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

export default withStyles(styles)(withContext(AssetAdd));







