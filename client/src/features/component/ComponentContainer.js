import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withStyles} from "material-ui";
import LoadingProgress from "../../common/LoadingProgress";
import ApisList from "./ComponentList";
import {fetchComponents} from "../../data/redux/dispatchers/component";
import {linkComponentToOrganisation, unlinkComponentFromOrganisation} from "../../data/redux/dispatchers/organisation";
import {withContext} from "../../data/context/withContext";

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
  }

  render() {
    if (this.props.components === undefined || this.props.context.currentOrganisation === undefined) {
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
          organisation={this.props.context.currentOrganisation}
          linkComponentToOrganisation={this.props.linkComponentToOrganisation}
          unlinkComponentFromOrganisation={this.props.unlinkComponentFromOrganisation}
          fetchComponents={this.props.fetchComponents}
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
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchComponents: fetchComponents,
    linkComponentToOrganisation: linkComponentToOrganisation,
    unlinkComponentFromOrganisation: unlinkComponentFromOrganisation,
  }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(withContext(ComponentContainer)));
