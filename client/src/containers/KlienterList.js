import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import { Route,  Link, withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter	} from 'react-router-dom'
import {fetchKlienter, deleteKlienter} from '../actions/klienterAction';
import { routerMiddleware as createRouterMiddleware,  routerReducer, push} from "react-router-redux";
import KlienterPage from '../components/klienter/KlienterPage';
import KlienterView from '../components/klienter/KlienterView';
import DashboardIcon from 'material-ui-icons/Home';


class KlienterList extends Component {
	constructor(props) {
	    super(props);
	    this.deleteKlienter= this.deleteKlienter.bind(this);
	}
	componentDidMount(){
  	     this.props.fetchKlienter()
   }

	deleteKlienter(klienter) {
		 this.props.deleteKlienter(klienter)
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
	    		<Router>
	     <div>

	     		<table><tbody><tr><td><a href="/"><DashboardIcon/></a></td><td><a href="/" style={{textDecoration:'none', color: 'black'}}>Dashboard</a></td></tr></tbody></table>
    			<h1>Klienter</h1>
            	<ul>
            		{this.props.posts.map((post, i) =>
                	<div>
	                	<table><tbody><tr>
	            		<td width="90%"><li className="list-group-item" key={i}><Link to={{pathname: '/klienter', state: { post : post}}}>{post.name}</Link></li></td>
	                    <td width="10%"><button type="submit" onClick={() => {this.deleteKlienter(post)}}>Delete</button></td>
	                    </tr></tbody></table>

                	</div>
            		)}
            	</ul>
            	<Route
            	  path="/klienter"
            	  render={({ props }) => (
            	    <KlienterView post={this.props.post} />
            	    )}
            	/>

            	<Route path="/Klienter" component={KlienterPage}/>
	      </div>
            	</Router>
	    );
	  }

}



function mapStateToProps(state){
	return {
        posts: state.posts
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({fetchKlienter: fetchKlienter, deleteKlienter : deleteKlienter}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KlienterList));

