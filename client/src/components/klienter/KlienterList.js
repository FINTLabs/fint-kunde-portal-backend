import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import {deleteKlient} from '../../actions/klienter';
import DashboardIcon from 'material-ui-icons/Home';
import KlientView from './KlientView';
import PropTypes from 'prop-types';
import {
  Avatar,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles
} from "material-ui";
import {green} from 'material-ui/colors';
import {Delete, Edit, ImportantDevices} from "material-ui-icons";

const styles = theme => ({
  clientListContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  clientList: {
    width: '75%',
  },
  avtarstyle: {
    margin: 1,
    color: '#fff',
    backgroundColor: green[500],
  },
  title: {
    paddingLeft: theme.spacing.unit * 3,
  },
  listItem: {
    borderBottom: '1px dashed lightgray',
  },
  itemAvatar: {
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
  }
});

const linkstyle = {
  margin: 1,
  textDecoration: 'none',
  textTransform: 'none',
  align: 'left'

};

class KlientsList extends Component {
  constructor(props) {
    super(props);
    this.deleteKlient = this.deleteKlient.bind(this);
    this.state = {klienter: this.props.klienter};
  }


  deleteKlient(klient) {
    this.props.deleteKlient(klient)
  }

  render() {

    const {classes} = this.props;
    return (
      <Router>
        <div>
          <div className={classes.clientListContainer}>
            <div className={classes.clientList}>
              <Typography variant="headline" className={classes.title}>Klienter</Typography>
              <Divider/>
              <List>
                {this.props.klienter.map((klient, i) =>
                  <ListItem className={classes.listItem}>
                    <ListItemAvatar>
                      <Avatar className={classes.itemAvatar}>
                        <ImportantDevices/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={klient.shortDescription}
                      secondary={klient.name}
                    />
                    <ListItemSecondaryAction>
                      <Link to={{pathname: '/klient', state: {klient: klient}}} style={{textDecoration: 'none'}}>
                        <IconButton aria-label="Edit">
                          <Edit/>
                        </IconButton>
                      </Link>
                      <IconButton aria-label="Delete" onClick={() => this.deleteKlient(klient)}>
                        <Delete/>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>,
                )}
              </List>
            </div>
          </div>
          <Route
            path="/klient"
            render={({props}) => (
              <KlientView klient={this.props.klient}/>
            )}
          />
        </div>
      </Router>
    );
  }

}

KlientsList.propTypes = {
  klienter: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {}
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({deleteKlient: deleteKlient}, dispatch);
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, matchDispatchToProps)(KlientsList)));


