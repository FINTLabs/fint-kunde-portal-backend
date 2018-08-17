import PropTypes from "prop-types";
import React, { Component } from "react";
import NoGoMessage from "./NoGoMessage";
import Grid from "../../../node_modules/@material-ui/core/Grid/Grid";

class NoGoContainer extends Component {
  render() {
    const { contactExists, contactHasOrganisations } = this.props;
    let message, gotoUrl, buttonTitle;
    if (!contactExists) {
      message = "Du har ikke opprettet bruker.";
      gotoUrl = "https://registrering.felleskomponent.no";
      buttonTitle = "Trykk her for å opprette konto";
    }
    if (contactExists && !contactHasOrganisations) {
      message = "Du er ikke tilknyttet en organisasjon. Gå til FINT administratoren i organisasjonen din for å få tilgang.";
      gotoUrl = "https://kunde.felleskomponent.no";
      buttonTitle = "Trykk her for å gå til Kundeportalen";
    }
    return (
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <NoGoMessage message={message} gotoUrl={gotoUrl} buttonTitle={buttonTitle}/>
        </Grid>
      </Grid>
    );
  }
}

NoGoContainer.propTypes = {
  contactExists: PropTypes.bool.isRequired,
  contactHasOrganisations: PropTypes.bool.isRequired
};

export default NoGoContainer;

