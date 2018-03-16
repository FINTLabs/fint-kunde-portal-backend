import React, {Component} from 'react';
import {Grid, Paper, Typography, withStyles} from "material-ui";
import PropTypes from 'prop-types';
import ClientList from "./client-list/ClientList";


const styles = theme => ({
  root: {
    width: '100%',

  },
  list: {
    background: theme.palette.background.paper,
  }
});


class Clients extends Component {

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Grid container>
          <Grid item>
              <Typography type="display1" gutterBottom>
                Klienter
              </Typography>
          </Grid>
          <Grid container justify="center">
            <ClientList/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Clients.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Clients);
