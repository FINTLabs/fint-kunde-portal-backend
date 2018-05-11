import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid} from "material-ui";
import LoadingProgress from "../../common/LoadingProgress";
import {fetchAdapters} from "../../data/redux/actions/adapters";
import AdaptersList from "./AdaptersList";
import AdapterAdd from "./AdapterAdd";
import withStyles from "material-ui/es/styles/withStyles";

const styles = () => ({
  root: {}
});

class AdaptersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {adapters: this.props.adapters};
  }

  componentWillMount() {
    this.props.fetchAdapters("testing")
  }

  render() {
    if (!this.props.adapters) {
      return <LoadingProgress/>;
    } else {
      return this.renderPosts();
    }
  }

  renderPosts() {
    return (
      <Grid container xs={12}>
        <Grid item xs={6}>
          <AdaptersList adapters={this.props.adapters} org="testing"/>
        </Grid>
        <Grid item xs={6}>
          <AdapterAdd org={this.props.org}/>
        </Grid>
      </Grid>

    );
  }
}

function mapStateToProps(state) {
  return {
    adapters: state.adapters,
    posts: state.posts
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({fetchAdapters: fetchAdapters}, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(AdaptersContainer));
