import React from "react";
import PropTypes from "prop-types";
import {TextField} from "@material-ui/core";

class AssetTabGeneral extends React.Component {


  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <div>
	    <TextField
	      name="id"
	      label="Asset Id"
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
          label="Name"
          multiline
          rows="4"
          onChange={this.props.updateAssetState}
          value={this.props.asset.name}
          fullWidth
        />
      </div>
    );
  }
}

AssetTabGeneral.propTypes = {
  asset: PropTypes.object.isRequired,
  updateAssetState: PropTypes.func.isRequired,
};

export default AssetTabGeneral;
