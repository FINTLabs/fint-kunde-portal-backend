import React from 'react';
import {BrowserRouter as Router, Link, Route, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OrgView from './OrgView';
import ApiView from './ApiView';
import {Grid} from "material-ui";
import Button from 'material-ui/Button';
import {green} from 'material-ui/colors';
import {fetchOrganisation, unlinkComponent} from "../../data/redux/actions/components";

const buttonstyle = {
  margin: 1,
  color: '#fff',
  backgroundColor: green[500],
  textDecoration: 'none',
  textTransform: 'none',

};
const linkstyle = {
  margin: 1,
  textDecoration: 'none',
  textTransform: 'none',

};

class OrgList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organisation: this.props.organisation,
      componenetName: this.props.apis[0].name,
      components: this.props.apis
    };
    this.unlinkComponent = this.unlinkComponent.bind(this);
  }


  componentDidMount() {
    this.props.fetchOrganisation()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.api !== nextProps.api) {
      this.setState({api: Object.assign({}, nextProps.api)});

    }

    this.setState({saving: false, isAdding: false});
  }


  unlinkComponent(api) {
    this.props.unlinkComponent(api);
  }

  updateApiState(event) {
    const field = event.target.name;
    const api = this.state.api;
    api[field] = event.target.value;
    return this.setState({
      value: event.target.value
    });
  }

  state = {
    open: false,
  };
  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
    //eslint-disable-next-line
    location.assign("/apis/apis");
  };
  handleCloseUnlink = (api) => {
    const componentName = api.substr(3, api.indexOf(',') - 3);
    this.unlinkComponent(componentName)
    this.setState({open: false});

  };

  render() {
    if (!this.props.organisation) {
      return <p>Nothing here yet...</p>;
    } else {
      return this.renderOrgs();
    }
  }

  renderOrgs() {
    const organisation = this.props.organisation;
    return (
      <Router>
        <div>
          <h3>Organisasjon:</h3><Link to={{pathname: '/organisation', state: {organisation: organisation}}}
                                      style={linkstyle}>{organisation.displayName}</Link>
          <h3>Koblede komponenter</h3>
          <ul className="list-group">
            {organisation.components.map((api, i) =>
              <div>
                <Grid container style={{lineHeight: '5px'}} spacing={24}>
                  <Grid item xs={12} sm={7}>
                    <Button bsStyle="primary" style={linkstyle}>{api.substr(3, api.indexOf(',') - 3)}</Button>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Button bsStyle="primary" onClick={() => this.handleCloseUnlink(api)} style={buttonstyle}>Løsne
                      komponenet</Button>
                  </Grid>
                </Grid>

              </div>
            )}
          </ul>

          <Route
            path="/organisation"
            render={({state}) => (
              <OrgView organisation={organisation}/>
            )}/>
          <Route
            path="/api"
            render={({state}) => (
              <ApiView api={this.state.api}/>
            )}/>

        </div>
      </Router>
    );
  }

}


OrgList.propTypes = {
//  adapters: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    organisation: state.organisation
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchOrganisation: fetchOrganisation,
    unlinkComponent: unlinkComponent
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(OrgList));
