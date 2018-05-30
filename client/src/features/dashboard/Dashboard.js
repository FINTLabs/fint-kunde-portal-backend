import React, {Component} from "react";
import {Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography, withStyles} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import AdapterIcon from "@material-ui/icons/Link";
import ApiIcon from "@material-ui/icons/WebAsset";
import ClientIcon from "@material-ui/icons/ImportantDevices";
import {fetchAdapters} from "../../data/redux/dispatchers/adapter";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchKlienter} from "../../data/redux/dispatchers/client";
import {fetchComponents} from "../../data/redux/dispatchers/component";
import LoadingProgress from "../../common/LoadingProgress";
import {withContext} from "../../data/context/withContext";

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
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchAdapters(this.props.context.currentOrganisation.name);
    this.props.fetchClients(this.props.context.currentOrganisation.name);
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
                      {this.props.context.currentOrganisation.components.length}
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withContext(Dashboard)));

