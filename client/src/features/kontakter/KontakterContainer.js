import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid} from "material-ui";
import LoadingProgress from "../../common/LoadingProgress";
import KontakterList from "./KontakterList";
import KontaktAdd from "./KontaktAdd";
import {fetchTechnicalContacts} from "../../data/redux/dispatchers/organisation";

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
  //kontakter: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  console.log(`contacts1: ${JSON.stringify(state.organisation.technicalContacts)}`);
  return {
    technicalContacts: state.organisation.technicalContacts
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({fetchTechnicalContacts: fetchTechnicalContacts}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(KontakterContainer);
