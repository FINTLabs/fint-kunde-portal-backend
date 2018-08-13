import React from "react";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import {Tab, Tabs} from "@material-ui/core";
import {withStyles} from "@material-ui/core";
import TabContainer from "../../../common/TabContainer";
import PropTypes from "prop-types";
import ClientTabComponent from "./ClientTabComponent";
import ClientTabGeneral from "./ClientTabGeneral";
import ClientTabAuthenticationInformation from "./ClientTabAuthenticationInformation";


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
});


class ClientTabView extends React.Component {

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
            <Tab label="Komponenter"/>
            <Tab label="Autentisering"/>
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <ClientTabGeneral client={this.props.client} updateClientState={this.props.updateClientState}/>
          </TabContainer>

          <TabContainer dir={theme.direction}>
            <ClientTabComponent client={this.props.client} notify={this.props.notify}/>
          </TabContainer>

          <TabContainer dir={theme.direction}>
            <ClientTabAuthenticationInformation client={this.props.client} notify={this.props.notify}/>
          </TabContainer>

        </SwipeableViews>

      </div>
    );
  }
}

ClientTabView.propTypes = {
  client: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  notify: PropTypes.func.isRequired,
  updateClientState: PropTypes.func.isRequired,
  showUpdateButton: PropTypes.func.isRequired,
};

export default withStyles(styles, {withTheme: true})(ClientTabView);
