import React from "react";
import PropTypes from "prop-types";
import {TextField} from "@material-ui/core";

class ClientTabGeneral extends React.Component {


  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <div>
        <TextField
          autoFocus
          name="shortDescription"
          label="Kort beskrivelse"
          fullWidth
          onChange={this.props.updateClientState}
          value={this.props.client.shortDescription}
        />
        <TextField
          name="note"
          label="Note"
          multiline
          rows="4"
          onChange={this.props.updateClientState}
          value={this.props.client.note}
          fullWidth
        />
      </div>
    );
  }
}

ClientTabGeneral.propTypes = {
  client: PropTypes.object.isRequired,
  updateClientState: PropTypes.func.isRequired,
};

export default ClientTabGeneral;
