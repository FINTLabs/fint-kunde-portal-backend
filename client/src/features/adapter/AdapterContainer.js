import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withStyles} from "material-ui";
import LoadingProgress from "../../common/LoadingProgress";
import {createAdapter, deleteAdapter, fetchAdapters, updateAdapter} from "../../data/redux/dispatchers/adapter";
import AdapterList from "./AdapterList";
import AdapterAdd from "./add/AdapterAdd";


const styles = () => ({
  root: {}
});

class AdapterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adapterAdded: false,
    }
  }

  componentDidMount() {
    this.props.fetchAdapters();
  }

  render() {
    if (!this.props.adapters) {
      return <LoadingProgress/>;
    } else {
      return this.renderAdapters();
    }
  }

  renderAdapters() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AdapterList adapters={this.props.adapters}
                     updateAdapter={this.props.updateAdapter}
                     deleteAdapter={this.props.deleteAdapter}
        />
        <AdapterAdd
          createAdapter={this.props.createAdapter}
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AdapterContainer));
