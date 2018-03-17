
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchPostsWithRedux} from '../actions/adaptersAction';

class AdaptersList extends Component {
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
  /*
        return this.props.posts._embedded["viaplay:blocks"]["0"]._embedded["viaplay:products"].map((series) => { 
            return (
  //          		const listItems = numbers.map((number) =>
            		  <li>{series.publicPath}</li>
 //           		<div>{series.publicPath}</div>
 //           		<img key={series.publicPath} src={series.content.images.landscape.url} alt={series.publicPath}  className="img-responsive" style={{width: 20 + '%', padding: 10 + 'px'}} />

                    );
                }
            );
     
    }
 */   
    render(){
        return(
            <div> 
            	<h1>Adapters</h1>
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

export default connect(mapStateToProps, matchDispatchToProps)(AdaptersList);