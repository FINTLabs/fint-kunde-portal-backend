import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import ClearIcon from "@material-ui/icons/Clear";
import LinkWalkerApi from "../../data/api/LinkWalkerApi";
import LinkWalkerTestView from "./LinkWalkerTestView";
import TrafficLight from "../../common/status/TrafficLight";
import Typography from "@material-ui/core/Typography";
import FeatureHelperText from "../../common/help/FeatureHelperText";

const styles = (theme) => ({
  root: {
    width: "90%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  statusFailed: {
    color: "red"
  },
  statusRunning: {
    color: "#f4a142"
  },
  statusOk: {
    color: "green"
  },
  button: {
    margin: theme.spacing.unit
  },
  title: {
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  help: {
    margin: theme.spacing.unit / 2,
  }
});

class LinkWalkerTestList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLinkWalkerTestView: false
    };
  }

  getStatusClass = (status) => {
    if (status === "OK") return this.props.classes.statusOk;
    if (status === "RUNNING") return this.props.classes.statusRunning;
    if (status === "FAILED") return this.props.classes.statusFailed;
  };

  refreshTestList = () => {
    const { organisationName, clientConfig } = this.props;
    this.props.fetchLinkWalkerTests(clientConfig.linkwalkerBaseUrl, organisationName);
  };

  clearTests = () => {
    const { organisationName, clientConfig } = this.props;
    LinkWalkerApi.clearTests(clientConfig.linkwalkerBaseUrl, organisationName)
      .then((response) => {
        if (response.status === 200) {
          this.props.notify("Testloggen ble slette!");
          this.props.fetchLinkWalkerTests(clientConfig.linkwalkerBaseUrl, organisationName);
        }
        else {
          this.props.notify("Oh shit, noe gikk galt!");
        }
      });
  };

  showTestView = (test) => {
    this.setState({
      showLinkWalkerTestView: true,
      test: test
    });
  };

  closeTestView = () => {
    this.setState({ showLinkWalkerTestView: false });
  };


  render() {

    const { tests, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.help}>
          <FeatureHelperText>
            En relasjonstest sjekker at alle relasjonene i en komponent virker.
          </FeatureHelperText>
        </div>
        <Typography variant="headline" className={classes.title}>Relasjonstest</Typography>

        <IconButton className={classes.button} aria-label="Refresh" color="primary"
                    onClick={() => this.refreshTestList()}>
          <RefreshIcon/>
        </IconButton>
        <IconButton className={classes.button} aria-label="Refresh" color="primary"
                    onClick={() => this.clearTests()}>
          <ClearIcon/>
        </IconButton>
        <Paper>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Tid</TableCell>
                <TableCell>Ressurs</TableCell>
                <TableCell>Beskrivelse av feil</TableCell>
                <TableCell numeric>Gjenstående sjekker</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.map(test => {
                return (
                  <TableRow key={test.id} hover onClick={() => this.showTestView(test)}>
                    <TableCell><TrafficLight status={test.status}/></TableCell>
                    <TableCell>{test.time}</TableCell>
                    <TableCell>{test.testRequest.baseUrl + test.testRequest.endpoint}</TableCell>
                    <TableCell>{test.reason}</TableCell>
                    <TableCell numeric>{test.remaining}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>

        <LinkWalkerTestView
          showLinkWalkerTestView={this.state.showLinkWalkerTestView}
          closeTestView={this.closeTestView}
          test={this.state.test}
        />
      </div>
    );
  }
}

LinkWalkerTestList.propTypes = {
  classes: PropTypes.any.isRequired,
  tests: PropTypes.any.isRequired
};

export default withStyles(styles)(LinkWalkerTestList);
