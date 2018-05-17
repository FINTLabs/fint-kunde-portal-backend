import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from "react-router-dom";
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogTitle,} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {updateContact} from "../../data/redux/dispatchers/contact";

class KontaktView extends React.Component {
  state = {
    open: false,
  };
  handleClickOpen = () => {
    this.setState({open: true});
  };
  handleClose = () => {
    this.updateKontakt(this.state.kontakt)
    this.setState({open: false});

  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      kontakt: Object.assign({}, this.props.location.state.kontakt),
      isSaving: true
    };

    this.updateKontaktState = this.updateKontaktState.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.updateKontakt = this.updateKontakt.bind(this);

  }

  componentDidMount() {
    this.setState({open: true});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.kontakt !== nextProps.kontakt) {
      this.setState({kontakt: Object.assign({}, nextProps.kontakt)});

    }

    this.setState({saving: false, isAdding: false});
  }

  toggleSave() {
    this.setState({isSaving: true});
  }

  updateKontakt(event) {
    this.props.updateContact(this.state.kontakt);
  }

  updateKontaktState(event) {
    const field = event.target.name;
    const kontakt = this.state.kontakt;
    kontakt[field] = event.target.value;
    return this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <div>
        <div>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Oppdater kontakt</DialogTitle>
            <DialogContent>
              <TextField
                name="nin"
                label="Fødselsnnummer"
                autoFocus
                margin="dense"
                required
                fullWidth
                onChange={this.updateKontaktState}
                value={this.state.kontakt.nin}
                type='password'
              />
              <TextField
                name="firstName"
                label="First Name"
                margin="normal"
                required
                fullWidth
                onChange={this.updateKontaktState}
                value={this.state.kontakt.firstName}
              />

              <TextField
                name="lastName"
                label="Last Name"
                required
                fullWidth
                onChange={this.updateKontaktState}
                value={this.state.kontakt.lastName}
              />

              <TextField
                name="mail"
                label="Mail"
                required
                fullWidth
                onChange={this.updateKontaktState}
                value={this.state.kontakt.mail}
              />

              <TextField
                name="mobile"
                label="Mobile"
                required
                fullWidth
                onChange={this.updateKontaktState}
                value={this.state.kontakt.mobile}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary" style={{textTransform: 'none'}}>
                Avbryt
              </Button>
              <Button onClick={this.handleClose} color="primary" style={{textTransform: 'none'}}>
                Oppdater
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    )

  }
}


KontaktView.propTypes = {};

function getKontaktById(kontakter, id) {
  let kontakt = kontakter.find(kontakt => kontakt.id === id)
  return Object.assign({}, kontakt)
}


function mapStateToProps(state) {
  let kontakt = {name: '', note: '', shortDescription: ''};
  const kontaktName = state.posts.name;
  if (kontaktName && state.kontakter.length > 0) {
    kontakt = getKontaktById(state.kontakter, state.posts.name);

  }
  return {kontakt: kontakt};
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({updateKontakt: updateContact}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KontaktView));
