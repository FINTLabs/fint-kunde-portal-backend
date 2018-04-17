import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Link, Route, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import KlienterList from '../components/klienter/KlienterList';
import KlientPage from '../components/klienter/KlientPage';
import {fetchKlienter} from '../actions/klienterAction';
import {Grid} from "material-ui";

class KlienterContainer extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {posts: this.props.posts};
	}
	componentDidMount(){
  	     this.props.fetchKlienter()

   }
	render () {
	    if (!this.props.posts) {
	      return <p>Nothing here yet...</p>;
	    } else {
	      return this.renderPosts();
	    }
	  }

	renderPosts () {
	    const klienter = this.props.posts;
	    return (
	         <Grid container xs={12}>
                <Grid item xs={5}>
                	<KlienterList klienter={klienter} />
                </Grid>
                <Grid item xs={7}>
                	<KlientPage />
                </Grid>
            </Grid>
  

    );
  }
}

KlienterContainer.propTypes = {
  klienter: PropTypes.array.isRequired
};

function mapStateToProps(state){
	return {
        posts: state.posts
  }
}
function  matchDispatchToProps(dispatch){
    return bindActionCreators({fetchKlienter: fetchKlienter}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KlienterContainer));
