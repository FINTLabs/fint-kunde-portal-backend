import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withStyles} from "material-ui";
import LoadingProgress from "../../common/LoadingProgress";
import AdaptersList from "./AdaptersList";
import AdapterAdd from "./AdapterAdd";
import {fetchComponents} from "../../data/redux/dispatchers/component";
import {
  addAdapterToComponent,
  createAdapter,
  deleteAdapter,
  deleteAdapterFromComponent,
  fetchAdapters,
  updateAdapter
} from "../../data/redux/dispatchers/adapter";


const styles = () => ({
  root: {}
});

class AdaptersContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adapterAdded: false,
    }
  }

  componentDidMount() {
    this.props.fetchAdapters(this.context.organisation)
  }

  static contextTypes = {
    organisation: PropTypes.string,
  };

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
        <AdaptersList adapters={this.props.adapters}
                      components={this.props.components}
                      updateAdapter={this.props.updateAdapter}
                      deleteAdapter={this.props.deleteAdapter}
                      addAdapterToComponent={this.props.addAdapterToComponent}
                      deleteAdapterFromComponent={this.props.deleteAdapterfromComponent}
                      fetchComponents={this.props.fetchComponents}

        />
        <AdapterAdd
          createAdapter={this.props.createAdapter}
        />
      </div>

    );
  }
}

AdaptersContainer.propTypes = {};

function mapStateToProps(state) {
  return {
    adapters: state.adapter.adapters,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAdapters: fetchAdapters,
    fetchComponents: fetchComponents,
    updateAdapter: updateAdapter,
    deleteAdapter: deleteAdapter,
    createAdapter: createAdapter,
    deleteAdapterFromComponent: deleteAdapterFromComponent,
    addAdapterToComponent: addAdapterToComponent,
  }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AdaptersContainer));
