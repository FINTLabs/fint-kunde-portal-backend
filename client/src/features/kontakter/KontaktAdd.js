import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SearchKontakt from './SearchKontakt';
import {BrowserRouter as Router, Link, Route, withRouter} from "react-router-dom";
import Button from 'material-ui/Button';
import {Add, Search} from "material-ui-icons";
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {createKontakt, fetchKontakter} from "../../data/redux/actions/kontakter";


class KontaktAdd extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      kontakt: Object.assign({}, this.props.location.state),
      isSaving: false,
      isAdding: false
    };
    this.createKontakt = this.createKontakt.bind(this);
    this.updateKontaktState = this.updateKontaktState.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.saveKontakt = this.saveKontakt.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    this.setState({saving: false, isAdding: false});
  }

  componentDidMount() {
    this.props.fetchKontakter();

  }

  toggleAdd() {

    this.setState({isAdding: true});
  }

  saveKontakt(event) {

    this.props.createKontakt(this.state.kontakt);
  }

  createKontakt(kontakt) {
    this.props.createKontakt(kontakt)
  }

  updateKontaktState(event) {
    const field = event.target.name;
    const kontakt = this.state.kontakt;
    kontakt[field] = event.target.value;
    return this.setState({kontakt: kontakt});
  }

  state = {
    open: false,
  };
  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.createKontakt(this.state.kontakt)
    this.setState({open: false});
  };


  render() {
    return (
      <Router>
        <div>
          <Link to={{pathname: '/searchKontakt', state: {kontakter: this.props.posts}}}
                style={{textDecoration: 'none'}}>
            <Button variant="fab" color="secondary"><Search/></Button></Link>

          <Button variant="fab" color="secondary" onClick={this.handleClickOpen}><Add/></Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Ny kontakt</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Vennligst fyll ut de obligatoriske feltene for å legge til ny kontakt
              </DialogContentText>

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
                Legg til
              </Button>
            </DialogActions>
          </Dialog>

          <Route
            path="/searchKontakt"
            render={({state}) => (
              <SearchKontakt kontakter={this.props.posts}/>
            )}
          />

        </div>
      </Router>

    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchKontakter: fetchKontakter,
    createKontakt: createKontakt
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(KontaktAdd));







