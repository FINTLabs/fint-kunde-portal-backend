import React, {Component} from 'react';
import AutoHideNotification from "../../common/AutoHideNotification";
import {withStyles} from "@material-ui/core";
import {withContext} from "../../data/context/withContext";
import LinkWalkerTestList from "./LinkWalkerTestList";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchLinkWalkerTests} from "../../data/redux/dispatchers/linkwalker";
import PropTypes from "prop-types";
import LoadingProgress from "../../common/LoadingProgress";
import LinkWalkerAddTest from "./LinkWalkerAddTest";

const styles = () => ({
  root: {}
});


class LinkWalkerContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notify: false,
      notifyMessage: '',
    };
  }

  notify = (message) => {
    this.setState({
      notify: true,
      notifyMessage: message,
    });
  };

  onCloseNotification = () => {
    this.setState({
      notify: false,
      notifyMessage: '',
    });
  };

  componentDidMount() {
    const {currentOrganisation, clientConfig} = this.props.context;
    this.props.fetchLinkWalkerTests(clientConfig.linkwalkerBaseUrl, currentOrganisation.name);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {currentOrganisation, clientConfig} = this.props.context;
    if (prevProps.context !== this.props.context) {
      this.props.fetchLinkWalkerTests(clientConfig.linkwalkerBaseUrl, currentOrganisation.name);
    }
  }

  render() {
    if (this.props.tests === undefined || this.props.context.currentOrganisation === undefined) {
      return <LoadingProgress/>;
    } else {
      return this.renderTestList();
    }
  }
  renderTestList() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AutoHideNotification
          showNotification={this.state.notify}
          message={this.state.notifyMessage}
          onClose={this.onCloseNotification}
        />
        <LinkWalkerAddTest
          organisationName={this.props.context.currentOrganisation.name}
          notify={this.notify}
          fetchLinkWalkerTests={this.props.fetchLinkWalkerTests}
        />
        <LinkWalkerTestList
          tests={this.props.tests}
          fetchLinkWalkerTests={this.props.fetchLinkWalkerTests}
          organisationName={this.props.context.currentOrganisation.name}
          notify={this.notify}
        />

      </div>
    );
  }
}

LinkWalkerContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  fetchLinkWalkerTests: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    tests: state.linkwalker.tests,
  }
}

function mapDispatchToProps(dispatch) {
  console.log('mapDispatchToProps');
  return bindActionCreators({
    fetchLinkWalkerTests: fetchLinkWalkerTests,
  }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withContext(LinkWalkerContainer)));

