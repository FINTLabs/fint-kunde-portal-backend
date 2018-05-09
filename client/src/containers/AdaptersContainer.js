import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AdaptersList from '../components/adapters/AdaptersList';
import AdapterAdd from '../components/adapters/AdapterAdd';
import {fetchAdapters} from '../actions/adapters';
import {Grid} from "material-ui";
import LoadingProgress from "../common/LoadingProgress";

const styles = theme => ({
	  root: {}
	});

class AdaptersContainer extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {adapters: this.props.adapters};
	}

	componentWillMount(){
  	     this.props.fetchAdapters("testing")

   }

	render () {
	    if (!this.props.adapters) {
        return <LoadingProgress/>;
      } else {
	      return this.renderPosts();
	    }
	  }

	renderPosts () {
	    const {classes} = this.props;
	    return (
	         <Grid container xs={12}>
                <Grid item xs={6}>
                	<AdaptersList adapters={this.props.adapters} org="testing" />
                </Grid>
                <Grid item xs={6}>
                	<AdapterAdd org={this.props.org}/>
                </Grid>
            </Grid>

    );
  }
}

function mapStateToProps(state){
	return {
        adapters: state.adapters,
        posts : state.posts
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({fetchAdapters: fetchAdapters}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AdaptersContainer);
