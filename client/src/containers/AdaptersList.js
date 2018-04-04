
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {fetchPostsWithRedux} from '../actions/adaptersAction';
import AdapterPage from '../components/adapters/AdapterPage';
import AdapterListItem from '../components/adapters/AdapterListItem';

class AdaptersList extends Component {
	componentDidMount(){
  	this.props.fetchPostsWithRedux()
  }
	/* The object looks like
{
        "dn": "cn=testAdapter,ou=adapters,ou=testing,ou=organisations,o=fint-test",
        "name": "testAdapter",
        "shortDescription": "This is a Test Adapter",
        "note": "Test Adapter",
        "clientId": "A_testing_testAdapter_ClientId",
        "components": []
    }
	 */
	render () {
	    if (!this.props.posts) {
	      return <p>Nothing here yet...</p>;
	    } else {
	      return this.renderPosts();
	    }
	  }

	  renderPosts () {
	    return (
	     <div> 
            	<h1>Adapters</h1>
            	
            	<ul>
            		{this.props.posts.map((post, i) =>
            		<li className="list-group-item" key={i}><Link to={'/adapters/'+i}>{post.name}</Link></li>
            		)}
            	</ul>


            	<Route path="/adapters/:i" component={AdapterPage}/>
	      </div>
	    );
	  }

}



function mapStateToProps(state){
	return {
        posts: state.posts
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({fetchPostsWithRedux: fetchPostsWithRedux}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AdaptersList);