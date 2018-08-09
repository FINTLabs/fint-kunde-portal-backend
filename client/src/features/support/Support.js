import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";


const styles = theme => ({});


class Support extends Component {

  render() {
    //const {classes} = this.props;

    return (
      <div>
        <h1>Support</h1>

      </div>
    );
  }
}

Support.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Support);
