import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "material-ui";
import ContactApi from "../../../data/api/ContactApi";

class ContactView extends Component {


  constructor(props) {
    super(props);
    this.state = {
      open: props.show,
      contact: props.contact,
    };

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      return {
        open: nextProps.show,
        contact: nextProps.contact,
      };
    }

    return null;
  }

  handleCancel = () => {
    //this.setState({open: false,});
    this.props.onClose();
  };

  updateContactState = (event) => {
    const field = event.target.name;

    const contact = this.state.contact;
    contact[field] = event.target.value;
    return this.setState({contact: contact});
  };

  updateContact = () => {
    ContactApi.updateContact(this.state.contact)
      .then(response => {
        this.props.notify("Kontakten ble oppdatert.");
        this.props.onClose();
      })
      .catch(error => {
      });

  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleCancel}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Kontakt</DialogTitle>
          <DialogContent>

            <TextField
              name="firstName"
              label="Fornavn"
              required
              fullWidth
              value={this.state.contact.firstName}
              onChange={this.updateContactState}
            />
            <TextField
              name="lastName"
              label="Etternavn"
              required
              fullWidth
              value={this.state.contact.lastName}
              onChange={this.updateContactState}
            />
            <TextField
              name="mail"
              label="E-post"
              required
              fullWidth
              value={this.state.contact.mail}
              onChange={this.updateContactState}
            />
            <TextField
              name="mobile"
              label="Mobil"
              required
              fullWidth
              value={this.state.contact.mobile}
              onChange={this.updateContactState}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleCancel()} color="primary">
              Avbryt
            </Button>
            <Button onClick={() => this.updateContact()} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}

ContactView.propTypes = {
  contact: PropTypes.any.isRequired,
  onClose: PropTypes.any.isRequired,
  show: PropTypes.any.isRequired
};

export default ContactView;
