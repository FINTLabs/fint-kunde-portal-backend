
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {fetchPostsWithRedux, deleteAdapter} from '../actions/adaptersAction';
import AdapterPage from '../components/adapters/AdapterPage';


class AdaptersList extends Component {
	constructor(props) {
	    super(props);
	    this.deleteAdapter= this.deleteAdapter.bind(this);
	}
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
	  deleteAdapter(adapter) {
		    this.props.deleteAdapter(adapter)
		  }
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
                	<div>
                	<table><tr>
            		<td width="90%"><li className="list-group-item" key={i}><Link to={'/adapters/'+i}>{post.name}</Link></li></td>
                    <td width="10%"><button onClick={this.deleteAdapter(post)} className="btn btn-default  ">Delete</button></td>
                    </tr></table>
                	</div>
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
    return bindActionCreators({fetchPostsWithRedux: fetchPostsWithRedux, deleteAdapter : deleteAdapter}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AdaptersList);