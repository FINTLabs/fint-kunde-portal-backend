import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Route,  Link, withRouter } from "react-router-dom";
import {fetchPostsWithRedux, deleteAdapter} from '../actions/adaptersAction';
import { routerMiddleware as createRouterMiddleware, ConnectedRouter as Router,  routerReducer, push} from "react-router-redux";
import AdapterPage from '../components/adapters/AdapterPage';


class AdaptersList extends Component {
	constructor(props) {
	    super(props);
	    this.deleteAdapter= this.deleteAdapter.bind(this);
	}
	componentDidMount(){
  	     this.props.fetchPostsWithRedux()
   }

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
            		<td width="90%"><li className="list-group-item" key={post.name}><Link to={'/adapter/:{adapter}'}>{post.name}</Link></li></td>
                    <td width="10%"><button type="submit" onClick={() => {this.deleteAdapter(post)}}>Delete</button></td>
                    </tr></table>
                	</div>
            		)}
            	</ul>


            	<Route path="/adapters" component={AdapterPage}/>
	      </div>
	    );
	    AdaptersList = withRouter(connect(null, { push })(AdaptersList));
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

