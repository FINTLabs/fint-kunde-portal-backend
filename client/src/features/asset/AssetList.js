import React, {Component} from "react";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles
} from "@material-ui/core";
import {Delete, Edit, InsertLink} from "@material-ui/icons";
import AssetView from "./view/AssetView";
import PropTypes from "prop-types";
import {withContext} from "../../data/context/withContext";
import WarningMessageBox from "../../common/WarningMessageBox";


const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  componentList: {
    width: '75%',
  },
  title: {
    paddingLeft: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit,
  },
  listItem: {
    borderBottom: '1px dashed lightgray',
  },
  primaryAsset: {
    borderBottom: '1px dashed lightgray',
    backgroundColor: theme.palette.secondary.light,
  },
  itemAvatar: {
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
  }
});

class AssetList extends Component {
  editAsset = (asset) => {
    this.setState({
      open: true,
      assetToEdit: asset,
    });
  };
  onCloseEdit = () => {
    this.setState({open: false});
  };
  updateAsset = (asset) => {
    const {currentOrganisation} = this.props.context;
    this.props.updateAsset(asset, currentOrganisation.name);
  };

  askToDeleteAsset = (asset) => {
    this.setState({
      assetToDelete: asset,
      askToDeleteAsset: true,
      message: "Er du sikker på at du vil slette ressursen '" + asset.description + "'?",
    });
  };

  onCloseDeleteAsset = (confirmed) => {
    this.setState({
      askToDeleteAsset: false,
    });

    if (confirmed) {
      this.deleteAsset(this.state.assetToDelete);
    }
  };

  deleteAsset = (asset) => {
    const {currentOrganisation} = this.props.context;
    this.props.deleteAsset(asset, currentOrganisation.name);
    this.props.notify(`Ressursen ${asset.name} ble slettet!`);
  };



  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.assets !== prevState.assets) {
      return {
        assets: nextProps.assets,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      assets: this.props.assets,
      assetToEdit: null,
      open: false,
      askToDeleteAsset: false,
      message: '',
    };

  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <WarningMessageBox
          show={this.state.askToDeleteAsset}
          message={this.state.message}
          onClose={this.onCloseDeleteAsset}
        />
        <div className={classes.root}>
          <div className={classes.componentList}>
            <Typography variant="headline" className={classes.title}>Ressurser</Typography>
            <Divider/>
            <List>
              {this.props.assets.map((asset) =>
                <ListItem className={(asset.primaryAsset === true) ? classes.primaryAsset : classes.listItem}
                          key={asset.name}>
                  <ListItemAvatar>
                    <Avatar className={classes.itemAvatar}>
                      <InsertLink/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={asset.description}
                    secondary={asset.assetId}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Edit" onClick={() => this.editAsset(asset)}>
                      <Edit/>
                    </IconButton>
                    {asset.primaryAsset !== true &&
                    <IconButton aria-label="Delete" onClick={() => this.askToDeleteAsset(asset)}>
                      <Delete/>
                    </IconButton>
                    }
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>
          </div>
        </div>
        <AssetView
          open={this.state.open}
          asset={this.state.assetToEdit}
          fetchAssets={this.props.fetchAssets}
          onClose={this.onCloseEdit}
          updateAsset={this.updateAsset}
        />
      </div>
    );
  }

}

AssetList.propTypes = {
  assets: PropTypes.array.isRequired
};


export default withStyles(styles)(withContext(AssetList));


