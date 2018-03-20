
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchPostsWithRedux} from '../actions/apiAction';

class ApiList extends Component {
	componentDidMount(){
	  	this.props.fetchPostsWithRedux()
	  }
		/* The object looks like
{
        "dn": "ou=administrasjon_personal,ou=apis,o=fint-test",
        "name": "administrasjon_personal",
        "description": "Administrasjon Personal",
        "organisations": [],
        "clients": [],
        "adapters": [],
        "basePath": "/administrasjon/personal"
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
	            	<h1>APIs</h1>
	            	<ul>
	            		{this.props.posts.map((post, i) =>
	            		<li key={i}>{post.name} : {post.description}</li>
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

export default connect(mapStateToProps, matchDispatchToProps)(ApiList);