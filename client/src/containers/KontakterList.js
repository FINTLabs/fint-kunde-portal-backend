
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchPostsWithRedux} from '../actions/kontakterAction';

class KontakterList extends Component {
	componentDidMount(){
  	this.props.fetchPostsWithRedux()
  }

    renderList() {
        if (!this.props.posts) {
            return (<div>Content Unavailable...</div>);
        }
        
        return this.props.posts._embedded["viaplay:blocks"]["0"]._embedded["viaplay:products"].map((series) => {
        	    return (
        	    		
        	      <li>
        	      		{series.publicPath}
        	      </li>
        	    );
        	  });
        	} 
 
    render(){
        return(
            <div> 
            	<h1>Kontakter</h1>
                { this.renderList()}
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