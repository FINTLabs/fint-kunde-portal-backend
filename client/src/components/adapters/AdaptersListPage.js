import React, { Component} from 'react';
import { connect } from 'react-redux';
import ContactList from './contact-list';
//import { fetchContacts, deleteContact } from '../actions/contact-actions';
import {fetchPostsWithRedux, deleteAdapter} from '../../actions/adaptersAction';

class AdaptersListPage extends Component {

  componentDidMount() {
    this.props.fetchPostsWithRedux();
  }

  render() {
    return (
      <div>
        <h1>List of Adapters</h1>
        <ContactList contacts={this.props.contacts} loading={this.props.loading} errors={this.props.errors} deleteAdapter={this.props.deleteAdapter}/>
      </div>
    )
  }
}

// Make contacts  array available in  props
function mapStateToProps(state) {
  return {
      contacts : state.contactStore.contacts,
      loading: state.contactStore.loading,
      errors: state.contactStore.errors
  }
}

export default connect(mapStateToProps, {fetchPostsWithRedux, deleteAdapter})(AdaptersListPage);