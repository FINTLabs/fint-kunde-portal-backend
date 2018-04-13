import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter	} from 'react-router-dom'
import {fetchKlienter, deleteKlient} from '../actions/klienterAction';
import { routerMiddleware as createRouterMiddleware,  routerReducer, push} from "react-router-redux";
import KlientPage from '../components/klienter/KlientPage';
import KlientView from '../components/klienter/KlientView';
import DashboardIcon from 'material-ui-icons/Home';


class KlienterList extends Component {
	constructor(props) {
	    super(props);
	    this.deleteKlient= this.deleteKlient.bind(this);
	}
	componentDidMount(){
  	     this.props.fetchKlienter()
   }

	deleteKlient(klienter) {
		 this.props.deleteKlient(klienter)
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
	            		<td width="90%"><li className="list-group-item" key={i}><Link to={{pathname: '/klient', state: { post : post}}}>{post.name}</Link></li></td>
	                    <td width="10%"><button type="submit" onClick={() => {this.deleteKlient(post)}}>Delete</button></td>
	                    </tr></tbody></table>

                	</div>
            		)}
            	</ul>
            	<Route
            	  path="/klient"
            	  render={({ props }) => (
            	    <KlientView post={this.props.post} />
            	    )}
            	/>

            	<Route path="/Klienter" component={KlientPage}/>
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
    return bindActionCreators({fetchKlienter: fetchKlienter, deleteKlient : deleteKlient}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KlienterList));

