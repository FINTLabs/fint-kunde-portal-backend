
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
    "userId": 1,
    "id": 1,
    "title": "",
    "body": ""
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
            		<li key={i}>{post.id} : {post.title}</li>
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