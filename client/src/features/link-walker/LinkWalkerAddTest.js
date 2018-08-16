import React from "react";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, withStyles,} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import LinkWalkerApi from "../../data/api/LinkWalkerApi";
import PropTypes from 'prop-types';
import ClientSelector from "../../common/test/ClientSelector";
import ComponentSelector from "../../common/test/ComponentSelector";
import EnvironmentSelector from "../../common/test/EnvironmentSelector";

const styles = () => ({
  addButton: {
    margin: 0,
    top: 100,
    left: 'auto',
    bottom: 'auto',
    right: 50,
    position: 'fixed',
  }

});

class LinkWalkerAddTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showLinkWalkerAddTest: false,
      baseUrl: '',
      endpoint: '',
      orgId: "pwf.no",
      client: '',

    };
  }

  handleChange = (e) => {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  };

  openAddDialog = () => {
    this.setState({showLinkWalkerAddTest: true, notify: false});
  };

  handleCancel = () => {
    this.setState({showLinkWalkerAddTest: false, notify: false});
  };

  addTest = () => {

    let test = this.getTest();
    const {organisationName, clientConfig} = this.props;

    LinkWalkerApi.addTest(clientConfig.linkwalkerBaseUrl, test, organisationName)
      .then(response => {
        if (response.status === 201) {
          this.props.notify("Testen ble opprettet");
          this.props.fetchLinkWalkerTests(clientConfig.linkwalkerBaseUrl, organisationName);
        }
        else {
          this.props.notify("Oisann, dette gikk ikke helt etter planen!");
        }

        this.setState({
          showLinkWalkerAddTest: false,
          notify: true,
          test: this.getEmptyTest(),
        });
      })
      .catch(() => {
        this.props.notify("Oisann, dette gikk ikke helt etter planen! Prøv igjen ;)");
      });

  };

  getTest = () => {
    return {
      endpoint: `${this.state.endpoint}/${this.state.resource}`,
      baseUrl: this.state.baseUrl,
      orgId: 'pwf.no',
      client: this.state.client,
    }
  };

  getEmptyTest = () => {
    return {
      baseUrl: '',
      endpoint: '',
      orgId: "pwf.no",
      client: '',
    };
  };

  isFormValid = () => {
    return (this.state.endpoint && this.state.baseUrl && this.state.resource);
  };

  render() {
    const {components, classes} = this.props;
    return (
      <div>
        <div>
          <Button variant="fab" color="secondary" className={classes.addButton}
                  onClick={this.openAddDialog}><Add/></Button>
          <Dialog
            open={this.state.showLinkWalkerAddTest}
            onClose={this.handleAddClient}
            aria-labelledby="form-dialog-title"
            maxWidth="md"
          >
            <DialogTitle id="form-dialog-title">Ny test</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Vennligst fyll ut de obligatoriske feltene for å legge til en ny test.
              </DialogContentText>

              <ComponentSelector
                components={components}
                handleChange={this.handleChange}
                name="endpoint"
                value={this.state.endpoint}
              />

              <EnvironmentSelector
                handleChange={this.handleChange}
                name="baseUrl"
                value={this.state.baseUrl}
              />

              <TextField
                name="resource"
                label="Ressurs"
                required
                fullWidth
                disabled={(this.state.endpoint === '')}
                onChange={this.handleChange}
              />

              <ClientSelector
                handleChange={this.handleChange}
                name="client"
                value={this.state.client}
                clients={this.props.clients}
                disabled={this.state.baseUrl === 'https://play-with-fint.felleskomponent.no'
                || this.state.baseUrl === ''
                || this.state.endpoint === ''}
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCancel} variant="raised" color="primary">
                Avbryt
              </Button>
              <Button disabled={!this.isFormValid()} onClick={() => this.addTest()} variant="raised" color="primary">
                Kjør test
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    )
  }
}


LinkWalkerAddTest.propTypes = {
  classes: PropTypes.object.isRequired,
  clientConfig: PropTypes.object.isRequired,
  clients: PropTypes.array.isRequired,
  components: PropTypes.array.isRequired,
  fetchLinkWalkerTests: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
  organisationName: PropTypes.string.isRequired
}

export default withStyles(styles)(LinkWalkerAddTest);







