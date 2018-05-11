import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withStyles} from "material-ui";
import LoadingProgress from "../../common/LoadingProgress";
import AdaptersList from "./AdaptersList";
import AdapterAdd from "./AdapterAdd";
import {createAdapter, deleteAdapter, fetchAdapters, updateAdapter} from "../../data/redux/actions/adapters";


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
	    components: PropTypes.array
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

AdaptersContainer.propTypes = {

};

function mapStateToProps(state) {
  return {
    adapters: state.adapters
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AdaptersContainer));
