import React, {Component} from 'react';
import {Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography, withStyles} from "material-ui";
import {green} from 'material-ui/colors';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import AdapterIcon from 'material-ui-icons/Link';
import ApiIcon from 'material-ui-icons/WebAsset';
import ClientIcon from 'material-ui-icons/ImportantDevices';
import {fetchAdapters} from "../../data/redux/dispatchers/adapter";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchKlienter} from "../../data/redux/dispatchers/client";
import {fetchComponents} from "../../data/redux/dispatchers/component";
import LoadingProgress from "../../common/LoadingProgress";

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
});

class Dashboard extends Component {


  constructor(props) {
    super(props);
    this.state = {
      organisation: {
        dn: "ou=testing,ou=organisations,o=FINT-TEST",
        name: "testing",
        orgNumber: "123456789",
        displayName: "Testing Unlimited",
        components: ["ou=administrasjon_fullmakt,ou=apis,o=FINT-TEST", "ou=utdanning_elev,ou=apis,o=FINT-TEST"],
        legalContact: "cn=42525252452,ou=contacts,o=FINT-TEST",
        technicalContacts: ["cn=6464131321311,ou=contacts,o=FINT-TEST", "cn=42525252452,ou=contacts,o=FINT-TEST", "cn=13124|442,ou=contacts,o=FINT-TEST", "cn=4522244242,ou=contacts,o=FINT-TEST", "cn=ggfgdfgdg,ou=contacts,o=FINT-TEST", "cn=27077412345,ou=contacts,o=FINT-TEST", "cn=32345432,ou=contacts,o=FINT-TEST", "cn=21212121212,ou=contacts,o=FINT-TEST"]
      }
    };
  }

  componentDidMount() {
    this.props.fetchAdapters();
    this.props.fetchClients();
    this.props.fetchComponents();

  }


  render() {
    const {classes, clients, adapters, components} = this.props;
    if (clients && adapters && components) {
      return (
        <div className={classes.root}>
          <Grid container spacing={24}>

            <Grid item xs={4}>
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
                      {clients.length}
                    </Typography>
                  </CardContent>

                </Card>
              </Link>
            </Grid>

            <Grid item xs={4}>
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
                      {adapters.length}
                    </Typography>
                  </CardContent>

                </Card>
              </Link>
            </Grid>

            <Grid item xs={4}>
              <Link to="apis" className={classes.cardLink}>

                <Card className={classes.card}>
                  <CardHeader
                    title="Komponenter"
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
                      {this.state.organisation.components.length}
                    </Typography>
                  </CardContent>

                </Card>
              </Link>
            </Grid>
          </Grid>
        </div>

      );
    }
    else {
      return (<LoadingProgress/>)
    }
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {

  return {
    adapters: state.adapter.adapters,
    components: state.component.components,
    clients: state.client.clients,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAdapters: fetchAdapters,
    fetchClients: fetchKlienter,
    fetchComponents: fetchComponents,
  }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

