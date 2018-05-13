import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import KontaktView from './KontaktView';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {Grid} from "material-ui";
import Table, {TableHead} from 'material-ui/Table';
import {green} from 'material-ui/colors';
import {fetchLegalContact, unsetLegalContact} from "../../data/redux/dispatchers/organisation";

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
  align: 'left'

};

class LegalKontakt extends Component {
  constructor(props) {
    super(props);
    this.unsetLegalContact = this.unsetLegalContact.bind(this);
    this.state = {legalContact: this.props.legalContact};
  }

  componentDidMount() {
    this.props.fetchLegalContact();

  }

  unsetLegalContact(kontakt) {
    this.props.unsetLegalContact(kontakt)
  }


  render() {
    if (!this.props.legalContact) {
      return (
        <div>
          <TextField id="text-field-default" defaultValue="Juridisk Kontakt"/><br></br>
          <p> Ingen definert juridisk kontakt ....</p>
        </div>
      );
    } else {
      return this.renderPosts();
    }
  }

  renderPosts() {
    const legalContact = this.props.legalContact;
    return (
      <Router>
        <div>
          <Table>
            <TableHead>
              <TextField id="text-field-default" defaultValue="Juridisk Kontakt"/>
            </TableHead>
          </Table>
          <Grid container style={{lineHeight: '4px'}} spacing={8}>
            <Grid item xs={12} sm={6}>
              <Link to={{pathname: '/kontakt', state: {kontakt: legalContact}}} style={{textDecoration: 'none'}}><Button
                style={linkstyle}>{legalContact.firstName} {legalContact.lastName}</Button></Link>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button bsStyle="primary" onClick={() => this.unsetLegalContact(legalContact)}
                      style={buttonstyle}>Slett</Button>
            </Grid>
            <Grid item xs={12} sm={2}>
            </Grid>
          </Grid>

          <Route
            path="/kontakt"
            render={({state}) => (
              <KontaktView kontakt={this.state.kontakt}/>
            )}
          />
        </div>
      </Router>
    );
  }

}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    legalContact: state.legalContact
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchLegalContact: fetchLegalContact,
    unsetLegalContact: unsetLegalContact
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(LegalKontakt));
