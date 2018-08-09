import React from "react";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, withStyles,} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import ComponentApi from "../../data/api/ComponentApi";
import LoadingProgress from "../../common/LoadingProgress";
import LinkWalkerApi from "../../data/api/LinkWalkerApi";
import PropTypes from 'prop-types';

const styles = () => ({
  addButton: {
    margin: 0,
    top: 80,
    left: 'auto',
    bottom: 'auto',
    right: 50,
    position: 'fixed',
  }

});

class LinkWalkerAddTest extends React.Component {


  getOrganisationComponents = () => {
    ComponentApi.getOrganisationComponents(this.props.organisationName)
      .then(([response, json]) => {
        if (response.status === 200) {
          this.setState({components: json});
        }
      });
  };

  handleChange = (e) => {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  };

  addResourceToEndPoint = (event) => {
    return this.setState({resource: event.target.value});
  };

  componentDidMount() {
    this.getOrganisationComponents();
  }


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
    }
  };

  isFormValid = () => {
    return (this.state.endpoint && this.state.baseUrl && this.state.resource);
  };

  getEmptyTest = () => {
    return {
      baseUrl: "https://play-with-fint.felleskomponent.no",
      endpoint: '',
      orgId: "pwf.no"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      showLinkWalkerAddTest: false,
    };
  }

  render() {
    if (this.state.components === undefined || this.props.organisationName === undefined) {
      return <LoadingProgress/>;
    } else {
      return this.renderAddTest();
    }
  }

  renderAddTest() {
    const {classes} = this.props;
    const {components} = this.state;
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

              <FormControl fullWidth required>
                <InputLabel htmlFor="age-native-simple">Komponent</InputLabel>
                <Select
                  native
                  value={this.state.endpoint}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'endpoint',
                    id: 'age-native-simple',
                  }}
                >
                  <option value=""/>
                  {components.map(component => {
                    return (
                      <option key={component.dn} value={component.basePath}>{component.description}</option>
                    );
                  })}

                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel htmlFor="age-native-simple">Miljø</InputLabel>
                <Select
                  native
                  value={this.state.baseUrl}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'baseUrl',
                    id: 'age-native-simple',
                  }}
                >
                  <option value=""/>
                  <option value="https://play-with-fint.felleskomponent.no">Play-With-FINT</option>
                  <option value="https://beta.felleskomponent.no">Beta</option>
                  <option value="https://api.felleskomponent.no">Produksjon</option>
                </Select>
              </FormControl>

              <TextField
                name="resource"
                label="Ressurs"
                required
                fullWidth
                disabled={(this.state.endpoint === undefined)}
                onChange={this.handleChange}
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
  classes: PropTypes.any.isRequired,
  notify: PropTypes.func.isRequired,
  organisationName: PropTypes.any.isRequired
};

export default withStyles(styles)(LinkWalkerAddTest);







