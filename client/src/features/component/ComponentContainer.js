import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withStyles} from "material-ui";
import LoadingProgress from "../../common/LoadingProgress";
import ApisList from "./ComponentList";
import {fetchComponents} from "../../data/redux/dispatchers/component";
import {
  fetchOrganisation,
  linkComponentToOrganisation,
  unlinkComponentFromOrganisation
} from "../../data/redux/dispatchers/organisation";

const styles = () => ({
  root: {},
});


class ComponentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchComponents();
    this.props.fetchOrganisation();
  }

  render() {
    if (!this.props.components) {
      return <LoadingProgress/>;
    } else {
      return this.renderPosts();
    }
  }

  renderPosts() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <ApisList
          components={this.props.components}
          organisation={this.props.organisation}
          linkComponentToOrganisation={this.props.linkComponentToOrganisation}
          unlinkComponentFromOrganisation={this.props.unlinkComponentFromOrganisation}
          fetchComponents={this.props.fetchComponents}
          fetchOrganisation={this.props.fetchOrganisation}
        />
      </div>
    );
  }
}

ComponentContainer.propTypes = {
  //apis: PropTypes.array.isRequired,

};

function mapStateToProps(state) {
  return {
    components: state.component.components,
    organisation: state.organisation.organisation,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchComponents: fetchComponents,
    fetchOrganisation: fetchOrganisation,
    linkComponentToOrganisation: linkComponentToOrganisation,
    unlinkComponentFromOrganisation: unlinkComponentFromOrganisation,
  }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(ComponentContainer));
