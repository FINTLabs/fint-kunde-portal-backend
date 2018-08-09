import React from "react";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle, withStyles,} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import TrafficLight from "../../common/TrafficLight";
import fileDownload from 'js-file-download';
import CircularJSON from 'circular-json';

const styles = (theme) => ({
  root: {
    width: '100%',
    //marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: '100%',
  },
  /*
  statusFailed: {
    color: "red",
  },
  statusRunning: {
    color: "#f4a142",
  },
  statusOk: {
    color: "green",
  },
  */
  tableHeader: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },

});

class LinkWalkerTestView extends React.Component {


  handleClose = () => {
    this.setState({showLinkWalkerTestView: false});
    this.props.closeTestView();
  };

  /*
  getStatusClass = (status) => {
    if (status === 'OK') return this.props.classes.statusOk;
    if (status === 'RUNNING') return this.props.classes.statusRunning;
    if (status === 'FAILED') return this.props.classes.statusFailed;
  };
  */

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.showLinkWalkerTestView !== prevState.showLinkWalkerTestView) {
      return {
        showLinkWalkerTestView: nextProps.showLinkWalkerTestView,
      };
    }

    return null;
  }

  downloadTestToJson = (testReport) => {
    fileDownload(CircularJSON.stringify(testReport), 'report.json');
  };


  constructor(props, context) {
    super(props, context);
    this.state = {
      showLinkWalkerTestView: props.showLinkWalkerTestView,
    };
  }

  render() {
    if (this.props.test !== undefined) {
      return this.renderTestView();
    }
    return (<div/>);

  }

  renderTestView() {

    const {classes} = this.props;
    const test = Object.assign({}, this.props.test);
    const relations = Object.entries(test.relations);
    return (
      <div>
        <div>

          <Dialog
            open={this.state.showLinkWalkerTestView}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            fullScreen
          >
            <DialogTitle id="form-dialog-title">Detaljer</DialogTitle>
            <DialogContent>

              <Paper>
                <Table className={classes.table}>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.tableHeader}>Status</TableCell>
                      <TableCell><TrafficLight status={test.status}/></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableHeader}>Tid</TableCell>
                      <TableCell>{test.time}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableHeader}>Ressurs</TableCell>
                      <TableCell>{test.testRequest.baseUrl + test.testRequest.endpoint}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableHeader}>Beskrivelse av feil</TableCell>
                      <TableCell>{test.reason}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableHeader}>Gjenstående sjekker</TableCell>
                      <TableCell>{test.remaining}</TableCell>
                    </TableRow>
                  </TableBody>

                </Table>
              </Paper>

              <h3>Detaljert feil beskrivelse</h3>

              {relations.map(relation => {
                const relationName = relation[0];
                const reports = relation[1];
                return (
                  <div key={relationName}>
                    <h4>{relationName}</h4>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Status</TableCell>
                          <TableCell>Url</TableCell>
                          <TableCell>Beskrivelse av feil</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {reports.map(report => {
                          return (
                            <TableRow hover key={report.url}>
                              <TableCell><TrafficLight status={report.status}/></TableCell>
                              <TableCell>{report.url}</TableCell>
                              <TableCell>{report.reason}</TableCell>
                            </TableRow>
                          );
                        })}


                      </TableBody>
                    </Table>
                  </div>
                );
              })}

            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.downloadTestToJson(test)} variant="raised" color="primary">
                Last ned test rapport (JSON)
              </Button>
              <Button onClick={this.handleClose} variant="raised" color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    )
  }
}


LinkWalkerTestView.propTypes = {
  classes: PropTypes.any.isRequired,
  closeTestView: PropTypes.any.isRequired,
  showLinkWalkerTestView: PropTypes.any.isRequired,
  test: PropTypes.any,
};

export default withStyles(styles)(LinkWalkerTestView);







