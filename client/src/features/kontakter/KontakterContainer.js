import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchTechnicalContacts} from '../../data/redux/actions/apisAction';
import {Grid} from "material-ui";
import LoadingProgress from "../../common/LoadingProgress";
import KontakterList from "./KontakterList";
import KontaktAdd from "./KontaktAdd";

class KontakterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {technicalContacts: this.props.technicalContacts};
  }

  componentDidMount() {
    this.props.fetchTechnicalContacts();

  }

  render() {
    if (!this.props.technicalContacts) {
      return <LoadingProgress/>;
    } else {
      return this.renderPosts();
    }
  }

  renderPosts() {
    const technicalContacts = this.props.technicalContacts;
    return (
      <Grid container xs={12} spacing={16}>
        <Grid item xs={6}>
          <KontakterList technicalContacts={technicalContacts}/>
        </Grid>
        <Grid item xs={6}>
          <KontaktAdd/>
        </Grid>
      </Grid>


    );
  }
}

KontakterContainer.propTypes = {
  kontakter: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    posts: state.posts,
    technicalContacts: state.technicalContacts
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({fetchTechnicalContacts: fetchTechnicalContacts}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(KontakterContainer);
