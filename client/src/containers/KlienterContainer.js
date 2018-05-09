import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import KlienterList from '../components/klienter/KlienterList';
import KlientAdd from '../components/klienter/KlientAdd';
import {fetchKlienter} from '../actions/klienter';
import {withStyles} from "material-ui";


const styles = theme => ({
  root: {}
});

class KlienterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts: this.props.posts};
  }

  componentDidMount() {
    this.props.fetchKlienter()

  }

  render() {
    if (!this.props.posts) {
      return <p>Nothing here yet...</p>;
    } else {
      return this.renderPosts();
    }
  }

  renderPosts() {
    const {classes} = this.props;
    const klienter = this.props.posts;
    return (
      <div className={classes.root}>
        <KlienterList klienter={klienter}/>
        <KlientAdd/>
      </div>


    );
  }
}

KlienterContainer.propTypes = {
  klienter: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({fetchKlienter: fetchKlienter}, dispatch);
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, matchDispatchToProps)(KlienterContainer)));
