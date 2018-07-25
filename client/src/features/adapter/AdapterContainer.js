import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withStyles} from "@material-ui/core";
import LoadingProgress from "../../common/LoadingProgress";
import {createAdapter, deleteAdapter, fetchAdapters, updateAdapter} from "../../data/redux/dispatchers/adapter";
import AdapterList from "./AdapterList";
import AdapterAdd from "./add/AdapterAdd";
import {withContext} from "../../data/context/withContext";
import AutoHideNotification from "../../common/AutoHideNotification";


const styles = () => ({
  root: {}
});

class AdapterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adapterAdded: false,
    };
  }

  componentDidMount() {
    this.props.fetchAdapters(this.props.context.currentOrganisation.name);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.context !== this.props.context) {
      this.props.fetchAdapters(this.props.context.currentOrganisation.name);
    }
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

  afterAddAdapter = () => {
    this.props.fetchAdapters(this.props.context.currentOrganisation.name);
  };

  render() {
    if (this.props.adapters === undefined || this.props.context.currentOrganisation === undefined) {
      return <LoadingProgress/>;
    } else {
      return this.renderAdapters();
    }
  }

  renderAdapters() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AutoHideNotification
          showNotification={this.state.notify}
          message={this.state.notifyMessage}
          onClose={this.onCloseNotification}
        />
        <AdapterList adapters={this.props.adapters}
                     updateAdapter={this.props.updateAdapter}
                     deleteAdapter={this.props.deleteAdapter}
        />
        <AdapterAdd organisation={this.props.context.currentOrganisation}
                    notify={this.notify}
                    afterAdd={this.afterAddAdapter}
        />
      </div>


    );
  }
}

AdapterContainer.propTypes = {};

function mapStateToProps(state) {

  return {
    adapters: state.adapter.adapters,
    components: state.component.components,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAdapters: fetchAdapters,
    updateAdapter: updateAdapter,
    deleteAdapter: deleteAdapter,
    createAdapter: createAdapter,
  }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withContext(AdapterContainer)));
