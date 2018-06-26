import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withStyles} from "@material-ui/core";
import LoadingProgress from "../../common/LoadingProgress";
import {createAsset, deleteAsset, fetchAssets, updateAsset} from "../../data/redux/dispatchers/asset";
import AssetList from "./AssetList";
import AssetAdd from "./AssetAdd";
import {withContext} from "../../data/context/withContext";


const styles = () => ({
  root: {}
});

class AssetContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assetAdded: false,
    };
  }

  componentDidMount() {
    this.props.fetchAssets(this.props.context.currentOrganisation.name);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.context !== this.props.context) {
      this.props.fetchAssets(this.props.context.currentOrganisation.name);
    }
  }

  render() {
    if (this.props.assets === undefined || this.props.context.currentOrganisation === undefined) {
      return <LoadingProgress/>;
    } else {
      return this.renderAssets();
    }
  }

  renderAssets() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AssetList assets={this.props.assets}
                     updateAsset={this.props.updateAsset}
                     deleteAsset={this.props.deleteAsset}
        />
        <AssetAdd organisation={this.props.context.currentOrganisation}
          			createAsset={this.props.createAsset}
        />
      </div>


    );
  }
}

AssetContainer.propTypes = {};

function mapStateToProps(state) {

  return {
    assets: state.asset.assets,
    components: state.component.components,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAssets: fetchAssets,
    updateAsset: updateAsset,
    deleteAsset: deleteAsset,
    createAsset: createAsset,
  }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withContext(AssetContainer)));
