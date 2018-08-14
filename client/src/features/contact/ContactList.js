import React from "react";
import {withStyles} from "@material-ui/core";
import TechnicalList from "./lists/TechnicalList";
import PropTypes from "prop-types";
import LegalList from "./lists/LegalList";


const styles = () => ({});

class ContactList extends React.Component {


  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {legalContact, technicalContacts} = this.props;
    return (
      <div>
        <LegalList
          legalContact={legalContact}
          notify={this.props.notify}
        />
        <TechnicalList technicalContacts={technicalContacts}
                       fetchTechnicalContacts={this.props.fetchTechnicalContacts}
                       afterUpdateLegalContact={this.props.afterUpdateLegalContact}
                       notify={this.props.notify}
                       legalContact={legalContact}
        />
      </div>
    );
  }
}

ContactList.propTypes = {
  fetchTechnicalContacts: PropTypes.any.isRequired,
  legalContact: PropTypes.object.isRequired,
  notify: PropTypes.any.isRequired,
  technicalContacts: PropTypes.array.isRequired,
  afterUpdateLegalContact: PropTypes.func.isRequired,
};

export default withStyles(styles)(ContactList);
