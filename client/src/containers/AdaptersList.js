
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchPostsWithRedux} from '../actions/adaptersAction';

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
            		<li key={i}>{post.clientId} : {post.shortDescription}</li>
            		)}
            	</ul>
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