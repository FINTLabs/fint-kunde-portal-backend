import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Link, Route, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AdaptersList from '../components/adapters/AdaptersList';
import AdapterPage from '../components/adapters/AdapterPage';
import {fetchAdapters} from '../actions/adaptersAction';


class AdaptersContainer extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {posts: this.props.posts};
	}
	componentDidMount(){
  	     this.props.fetchAdapters()

   }
	render () {
	    if (!this.props.posts) {
	      return <p>Nothing here yet...</p>;
	    } else {
	      return this.renderPosts();
	    }
	  }

	renderPosts () {
	    const adapters = this.props.posts;
	    return (

	    		    <table><tr>
	    		    <td width="70%"><AdaptersList adapters={adapters} /></td>
	    		    <td width="30%" valign="top" align="left"><AdapterPage /></td>
	    		    </tr></table>  

    );
  }
}

AdaptersContainer.propTypes = {
  adapters: PropTypes.array.isRequired
};

function mapStateToProps(state){
	return {
        posts: state.posts
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({fetchAdapters: fetchAdapters}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(AdaptersContainer));
