import React, {Component} from 'react';
import {Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography, withStyles} from "material-ui";
import {green} from 'material-ui/colors';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import ContactIcon from 'material-ui-icons/Person';
import AdapterIcon from 'material-ui-icons/Link';
import ApiIcon from 'material-ui-icons/WebAsset';
import ClientIcon from 'material-ui-icons/ImportantDevices';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
    height: '100%',
  },
  cardContent: {
    textAlign: 'center',
  },
  cardLink: {
    textDecoration: 'none'
  },
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
  logo: {
    height: '15%',
    width: '15%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '25%',
  }

});

class Dashboard extends Component {

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>

          <Grid item xs={3}>
            <Link to="clients" className={classes.cardLink}>
              <Card className={classes.card}>
                <CardHeader
                  title="Klienter"
                  avatar={
                    <Avatar className={classes.avatar}>
                      <ClientIcon className={classes.avatar}/>
                    </Avatar>
                  }
                  subheader="Antall"
                />
                <Divider/>
                <CardContent className={classes.cardContent}>
                  <Typography type="display4">
                    25
                  </Typography>
                </CardContent>

              </Card>
            </Link>
          </Grid>

          <Grid item xs={3}>
            <Link to="adapters" className={classes.cardLink}>

              <Card className={classes.card}>
                <CardHeader
                  title="Adapter"
                  avatar={
                    <Avatar className={classes.avatar}>
                      <AdapterIcon className={classes.avatar}/>
                    </Avatar>
                  }
                  subheader="Antall"
                />
                <Divider/>
                <CardContent className={classes.cardContent}>
                  <Typography type="display4">
                    5
                  </Typography>
                </CardContent>

              </Card>
            </Link>
          </Grid>

          <Grid item xs={3}>
            <Link to="apis" className={classes.cardLink}>

              <Card className={classes.card}>
                <CardHeader
                  title="API"
                  avatar={
                    <Avatar className={classes.avatar}>
                      <ApiIcon className={classes.avatar}/>
                    </Avatar>
                  }
                  subheader="Antall"
                />
                <Divider/>
                <CardContent className={classes.cardContent}>
                  <Typography type="display4">
                    5
                  </Typography>
                </CardContent>

              </Card>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link to="contacts" className={classes.cardLink}>

              <Card className={classes.card}>
                <CardHeader
                  title="kontakter"
                  avatar={
                    <Avatar className={classes.avatar}>
                      <ContactIcon className={classes.avatar}/>
                    </Avatar>
                  }
                  subheader="Antall"
                />
                <Divider/>
                <CardContent className={classes.cardContent}>
                  <Typography type="display4">
                    5
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        </Grid>
        <img src="fint.svg" alt="logo" className={classes.logo}/>
      </div>

    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Dashboard);
