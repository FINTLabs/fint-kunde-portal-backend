import React from "react";
import PropTypes from "prop-types";
import {TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/core";


const styles = (theme) => ({
  primaryAsset: {
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  }
});

class AssetTabGeneral extends React.Component {


  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        {this.props.asset.primaryAsset === true &&
        <div className={classes.primaryAsset}>
          PRIMÆR RESSURS
        </div>
        }
        <TextField
          name="assetId"
          label="RessursID"
          onChange={this.props.updateAssetState}
          value={this.props.asset.assetId}
          disabled
          fullWidth
        />
        <TextField
          autoFocus
          name="description"
          label="Beskrivelse"
          fullWidth
          onChange={this.props.updateAssetState}
          value={this.props.asset.description}
        />
        <TextField
          name="name"
          label="Navn"
          onChange={this.props.updateAssetState}
          value={this.props.asset.name}
          disabled
          fullWidth
        />

      </div>
    )
      ;
  }
}

AssetTabGeneral.propTypes = {
  asset: PropTypes.object.isRequired,
  updateAssetState: PropTypes.func.isRequired,
};

export default withStyles(styles)(AssetTabGeneral);
