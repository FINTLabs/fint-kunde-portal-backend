import React, {Component} from 'react';
import AutoHideNotification from "../../common/AutoHideNotification";
import ComponentApi from "../../data/api/ComponentApi";
import LoadingProgress from "../../common/LoadingProgress";
import ComponentSelector from "../../common/ComponentSelector";
import Typography from "@material-ui/core/Typography";
import EnvironmentSelector from "../../common/EnvironmentSelector";
import ClientSelector from "../../common/ClientSelector";
import PropTypes from "prop-types";
import {withContext} from "../../data/context/withContext";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchClients} from "../../data/redux/dispatchers/client";
import {withStyles} from "@material-ui/core";
import BasicTestApi from "../../data/api/BasicTestApi";
import BasicTestRunButton from "./BasicTestRunButton";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TrafficLight from "../../common/TrafficLight";
import HealthTestApi from "../../data/api/HealthTestApi";

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  testForm: {
    width: '75%',
  },
  formControls: {
    marginTop: theme.spacing.unit,
  },
  formActions: {
    display: 'inline-block',
    marginTop: theme.spacing.unit * 2,
    //justifyContent: 'right',
    borderBottom: 'lightgray dotted 1px',
    width: '100%'
  },
  healthStatusLight: {},
  healthStatusMessage: {},
  title: {},
});

class BasicTestContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notify: false,
      notifyMessage: '',
      components: [],
      endpoint: '',
      baseUrl: '',
      client: '',
      runningTest: false,
      loading: false,
      success: true,
      testCases: [],
    };
  }

  notify = (message) => {
    this.setState({
      notify: true,
      notifyMessage: message,
    });
  };

  onCloseNotification = () => {
    this.setState({
      notify: false,
      notifyMessage: '',
    });
  };

  getOrganisationComponents = (organisationName) => {
    ComponentApi.getOrganisationComponents(organisationName)
      .then(([response, json]) => {
        if (response.status === 200) {
          this.setState({components: json});
        }
      });
  };

  componentDidMount() {
    const {currentOrganisation} = this.props.context;
    this.props.fetchClients(currentOrganisation.name);
    this.getOrganisationComponents(currentOrganisation.name);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {currentOrganisation} = this.props.context;
    if (prevProps.context !== this.props.context) {
      this.props.fetchClients(currentOrganisation.name);
      this.getOrganisationComponents(currentOrganisation.name);
    }
  }

  handleChange = (e) => {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  };

  getTest = () => {
    return {
      endpoint: `${this.state.endpoint}`,
      baseUrl: this.state.baseUrl,
      client: this.state.client,
    }
  };

  runTest = () => {

    this.setState({
      loading: true,
      success: false,
      testCases: [],
      healthResult: {},
    });
    this.notify("Testen ble startet!");
    const test = this.getTest();
    console.log(`Running test: ${JSON.stringify(test)}`);

    const {clientConfig} = this.props.context;
    BasicTestApi.runTest(clientConfig.testServiceBaseUrl, test)
      .then(([response, json]) => {
        if (response.status === 200) {
          this.setState({testCases: json.cases});
        }
        else {
          console.log(response);
          this.notify("Oisann, dette gikk ikke helt etter planen!");
        }
        this.setState({
          loading: false,
          success: true,
        });
      })
      .catch(() => {
        this.notify("Oisann, dette gikk ikke helt etter planen! Prøv igjen ;)");
        this.setState({
          loading: false,
          success: true,
        });
      });

    this.setState({healthResult: {status: 'RUNNING', healthData: []}});
    HealthTestApi.runTest(clientConfig.testServiceBaseUrl, test)
      .then(([response, json]) => {
        if (response.status === 200) {
          this.setState({healthResult: json});
        }
        else {
          console.log(response);
          this.notify("Oisann, dette gikk ikke helt etter planen!");
        }
        this.setState({
          //loading: false,
          //success: true,
        });
      })
      .catch(() => {
        this.notify("Oisann, dette gikk ikke helt etter planen! Prøv igjen ;)");
        this.setState({
          //loading: false,
          //success: true,
        });
      });

  };

  getDateFromUnixTimeStamp = (timestamp) => {
    let date = new Date(timestamp);
    return date.toISOString();
  };
  isFormValid = () => {
    return (this.state.endpoint && this.state.baseUrl);
  };

  render() {
    if (this.props.context.currentOrganisation === undefined || this.props.context.clientConfig === undefined) {
      return <LoadingProgress/>;
    } else {
      return this.renderContainer();
    }
  }

  renderContainer() {
    const {testCases, healthResult} = this.state;
    console.log(testCases);
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <AutoHideNotification
          showNotification={this.state.notify}
          message={this.state.notifyMessage}
          onClose={this.onCloseNotification}
        />


        <div className={classes.testForm}>
          <div className={classes.title}>
            <Typography variant="headline">Basistest</Typography>
          </div>
          <div className={classes.formControls}>
            <ComponentSelector
              components={this.state.components}
              handleChange={this.handleChange}
              name={"endpoint"}
              value={this.state.endpoint}
            />
            <EnvironmentSelector
              handleChange={this.handleChange}
              name={"baseUrl"}
              value={this.state.baseUrl}
            />
            <ClientSelector
              handleChange={this.handleChange}
              name="client"
              value={this.state.client}
              clients={this.props.clients}
            />
          </div>
          <div className={classes.formActions}>
            <BasicTestRunButton
              disabled={!this.isFormValid()}
              onClick={() => this.runTest()}
              loading={this.state.loading}
              success={this.state.success}/>
          </div>

          <div>
            <h4>Helsestatus</h4>

            <div>
              {healthResult &&
              <div>
                <div>
                  <Table className={classes.table}>
                    <TableBody>

                      <TableRow>
                        <TableCell><TrafficLight status={healthResult.status}/></TableCell>
                        <TableCell padding='dense'><Typography variant="subheading">{healthResult.message}</Typography></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>Component</TableCell>
                        <TableCell>Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {healthResult.healthData.map(h => {
                        return (
                          <TableRow hover key={h.time}>
                            <TableCell>{h.status}</TableCell>
                            <TableCell>{h.component}</TableCell>
                            <TableCell>{h.time}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>

              }
            </div>
          </div>
          <div>
            <h4>Rapport</h4>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Ressurs</TableCell>
                  <TableCell>Sist oppdatert</TableCell>
                  <TableCell>Cache størrelse</TableCell>
                  <TableCell>Melding</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {testCases.map(c => {
                  return (
                    <TableRow hover key={c.resource}>
                      <TableCell><TrafficLight status={c.status}/></TableCell>
                      <TableCell>{c.resource.toUpperCase()}</TableCell>
                      <TableCell>{this.getDateFromUnixTimeStamp(c.lastUpdated)}</TableCell>
                      <TableCell>{c.size}</TableCell>
                      <TableCell>{c.message}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

BasicTestContainer.defaultProps = {
  clients: [],
};

BasicTestContainer.propTypes = {
  clients: PropTypes.array.isRequired,
  context: PropTypes.object.isRequired,
  fetchClients: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    clients: state.client.clients,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchClients: fetchClients,
  }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withContext(BasicTestContainer)));
