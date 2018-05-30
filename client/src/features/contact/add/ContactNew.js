import React, {Component} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ContactApi from "../../../data/api/ContactApi";
import PropTypes from "prop-types";


const styles = (theme) => ({
  createContactButton: {
    margin: theme.spacing.unit,
    top: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
    position: 'absolute',
  },
  dialogContent: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  }
});

class ContactNew extends Component {


  constructor(props) {
    super(props);
    this.state = {
      contact: {},
      open: false,
    };
  }

  openCreateDialog = () => {
    this.setState({
      open: true,
    })
  };

  handleCancel = () => {
    this.setState({open: false});
  };

  updateContactState = (event) => {

    const field = event.target.name;

    const contact = this.state.contact;
    contact[field] = event.target.value;
    return this.setState({contact: contact});
  };

  createContact = () => {
    ContactApi.createContact(this.state.contact)
      .then(response => {
        if (response.status === 201) {
          this.props.notify("Kontakten ble opprettet");
        }
        else {
          this.props.notify("Kontakten finnes fra før");
        }
        this.setState({open: false});
        this.props.onClose(this.state.contact);
      })
      .catch(() => {
        this.props.notify("Det oppsto en feil ved opprettelse av kontakten.");
      });
  };

  isFormValid = () => {
    const contact = this.state.contact;
    return contact.nin && contact.firstName && contact.lastName && contact.mail && contact.mobile;
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Button onClick={() => this.openCreateDialog()} variant="fab" color="primary" aria-label="add"
                className={classes.createContactButton}>
          <AddIcon/>
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleCancel}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Kontakt</DialogTitle>
          <DialogContent className={classes.dialogContent}>

            <TextField
              name="nin"
              label="Fødselsnummer"
              required
              fullWidth
              onChange={this.updateContactState}
            />
            <TextField
              name="firstName"
              label="Fornavn"
              required
              fullWidth
              onChange={this.updateContactState}
            />
            <TextField
              name="lastName"
              label="Etternavn"
              required
              fullWidth
              onChange={this.updateContactState}
            />
            <TextField
              name="mail"
              label="E-post"
              required
              fullWidth
              onChange={this.updateContactState}
            />
            <TextField
              name="mobile"
              label="Mobil"
              required
              fullWidth
              onChange={this.updateContactState}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleCancel()} color="primary">
              Avbryt
            </Button>
            <Button disabled={!this.isFormValid()} onClick={() => this.createContact()} color="primary">
              Opprett
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ContactNew.propTypes = {
  classes: PropTypes.any.isRequired,
  notify: PropTypes.any.isRequired,
  onClose: PropTypes.any.isRequired
};

export default withStyles(styles)(ContactNew);
