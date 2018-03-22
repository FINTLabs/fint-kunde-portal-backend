import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import AdapterPage from '../../components/adapters/AdapterPage';

class AdaptersList extends Component {
	componentDidMount(){
  	this.props.fetchPosts()
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

	  renderPosts (posts) {
		  return posts.map((post) => {
		      return (
		        <li className="list-group-item" key={post.name}>
		          <Link style={{color:'black'}} to={"/adapters/AdapterPage/" + post.name}>
		            <h3 className="list-group-item-heading">{post.name}</h3>
		          </Link>
		        </li>
		      );
		    });
	  }
		  /*
	    return (
	     <div> 
            	<h1>Adapters</h1>
            	
            	<ul>
            		{this.props.posts.map((post, i) =>
            		<li className="list-group-item" key={i}><Link to={'/adapters/AdapterPage/' + i}>{post.name}</Link></li>
            		)}
            	</ul>
            	<NavLink className="item" activeClassName="active" exact to="/adapters/newAdapterPage">Add Adapter</NavLink>
            	<Route path="/adapters/newAdapterPage" component={AdapterPage}/>
	      </div>
	    );
	  }
*/
}

export default AdaptersList;