import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AdaptersContainer from "../containers/AdaptersContainer";
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, withRouter	} from 'react-router-dom';


class Adapters extends Component {

	static contextTypes = {
        organisation: PropTypes.string
    };
	
    render() {
		const org = this.context.organisation;
        return (
      	  <Route
  	      	path="/"
  	      	render={({ state }) => (
  	        <AdaptersContainer org={org} />
  	        )}
  	      />
        );
    }
}

function mapStateToProps(state){
	return {
  }
}

export default withRouter(connect(mapStateToProps)(Adapters));
