import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchPostsWithRedux} from '../actions/kontakterAction';

class KontakterList extends Component {
	componentDidMount(){
  	this.props.fetchPostsWithRedux()
  }
	
	/* The object looks like
 	{
        "dn": "cn=12345678901,ou=contacts,o=fint-test",
        "nin": "12345678901",
        "firstName": "Tore",
        "lastName": "Test",
        "mail": "test@example.com",
        "mobile": "98765432",
        "technical": [],
        "legal": []
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
            	<h1>Kontakter</h1>
            	<ul>
            		{this.props.posts.map((post, i) =>
            			<li key={i}>{post.nin} : {post.firstName} {post.lastName}</li>
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

export default connect(mapStateToProps, matchDispatchToProps)(KontakterList);