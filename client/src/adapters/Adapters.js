import React, {Component} from 'react';
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';
import AdaptersContainer from "../containers/AdaptersContainer";
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, withRouter	} from 'react-router-dom';


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

Adapters.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
	return {
  }
}

export default withRouter(connect(mapStateToProps)(Adapters));
