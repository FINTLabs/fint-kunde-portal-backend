import React, {Component} from "react";
import PropTypes from "prop-types";
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
import {Edit, InsertLink} from "@material-ui/icons";
import AutoHideNotification from "../../common/AutoHideNotification";
import AssetView from "./view/AssetView";
import {withContext} from "../../data/context/withContext";

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
    console.log(currentOrganisation);
    this.props.updateAsset(asset, currentOrganisation.name);
  };

  onCloseNotification = () => {
    this.setState({
      notify: false,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      assets: this.props.assets,
      assetToEdit: null,
      open: false,
      notify: false,
    };

  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <AutoHideNotification
          showNotification={this.state.notify}
          onClose={this.onCloseNotification}

        />
        <div className={classes.root}>
          <div className={classes.componentList}>
            <Typography variant="headline" className={classes.title}>Asset</Typography>
            <Divider/>
            <List>
              {this.props.assets.map((asset) =>
                <ListItem className={classes.listItem} key={asset.id}>
                  <ListItemAvatar>
                    <Avatar className={classes.itemAvatar}>
                      <InsertLink/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={asset.description}
                    secondary={asset.name}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Edit" onClick={() => this.editAsset(asset)}>
                      <Edit/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>
          </div>
        </div>
        <AssetView
          open={this.state.open}
          asset={this.state.assetToEdit}
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


