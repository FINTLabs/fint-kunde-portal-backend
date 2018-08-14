import React from "react";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import {Tab, Tabs, withStyles} from "@material-ui/core";
import TabContainer from "../../../common/tab/TabContainer";
import PropTypes from "prop-types";
import AssetTabAdapter from "./AssetTabAdapter";
import AssetTabClient from "./AssetTabClient";
import AssetTabGeneral from "./AssetTabGeneral";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
});


class AssetTabView extends React.Component {

  handleChange = (event, value) => {
    this.setState({value});
    if (value === 0) {
      this.props.showUpdateButton(true);
    }
    else {
      this.props.showUpdateButton(false);
    }

  };
  handleChangeIndex = index => {
    this.setState({value: index});
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.asset !== prevState.asset) {
      return {
        asset: nextProps.asset,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  render() {
    const {classes, theme} = this.props;

    return (

      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Generelt"/>
            <Tab label="Adapters"/>
            <Tab label="Klienter"/>
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <AssetTabGeneral asset={this.props.asset} updateAssetState={this.props.updateAssetState}/>
          </TabContainer>

          <TabContainer dir={theme.direction}>
            <AssetTabAdapter
              asset={this.props.asset}
              notify={this.props.notify}
              fetchAssets={this.props.fetchAssets}
              fetchAdapters={this.props.fetchAdapters}
              adapters={this.props.adapters}
            />
          </TabContainer>

          <TabContainer dir={theme.direction}>
            <AssetTabClient
              asset={this.state.asset}
              notify={this.props.notify}
              fetchAssets={this.props.fetchAssets}
              fetchClients={this.props.fetchClients}
              clients={this.props.clients}
            />
          </TabContainer>
        </SwipeableViews>

      </div>
    );
  }
}

AssetTabView.propTypes = {
  asset: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  notify: PropTypes.func.isRequired,
  updateAssetState: PropTypes.func.isRequired,
  showUpdateButton: PropTypes.func.isRequired,
};

export default withStyles(styles, {withTheme: true})(AssetTabView);
