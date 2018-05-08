import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ApisList from '../components/apis/ApisList';
import OrgList from '../components/apis/OrgList';
import {fetchApis} from '../actions/apisAction';
import {Grid, withStyles} from "material-ui";
import LoadingProgress from "../common/LoadingProgress";

const styles = theme => ({});


class ApisContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.posts,
    };

  }

  componentDidMount() {
    this.props.fetchApis();

  }


  render() {

    if (!this.props.posts) {
      return <LoadingProgress/>;
    } else {
      return this.renderPosts();
    }
  }

  renderPosts() {
    const apis = this.props.posts;

    return (
      <Grid container xs={12}>
        <Grid item xs={5}>
          <ApisList apis={apis}/>
        </Grid>
        <Grid item xs={7}>
          <OrgList apis={apis}/>
        </Grid>
      </Grid>
    );
  }
}

ApisContainer.propTypes = {
  apis: PropTypes.array.isRequired,

};

function mapStateToProps(state) {
  return {
    posts: state.posts,

  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({fetchApis: fetchApis}, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(ApisContainer));
