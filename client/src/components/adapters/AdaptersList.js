import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import {deleteAdapter} from '../../actions/AdaptersAction';
import DashboardIcon from 'material-ui-icons/Home';
import AdapterView from './AdapterView';
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

class AdaptersList extends Component {
  constructor(props) {
    super(props);
    this.deleteAdapter = this.deleteAdapter.bind(this);
    this.state = {adapters: this.props.adapters};
  }

  deleteAdapter(adapter) {
	  this.props.deleteAdapter(adapter, this.props.org);
  }

  render() {

    const {classes} = this.props;
    return (
      <Router>
        <div>
          <a href="/" style={{textDecoration: 'none'}}><CardHeader title="Dashboard" avatar={
            <Avatar className={classes.avtarstyle}>
              <DashboardIcon/>
            </Avatar>}/></a>
          <div className={classes.clientListContainer}>
            <div className={classes.clientList}>
              <Typography variant="headline" className={classes.title}>Adapters</Typography>
              <Divider/>
              <List>
                {this.state.adapters.map((adapter, i) =>
                  <ListItem className={classes.listItem}>
                    <ListItemAvatar>
                      <Avatar className={classes.itemAvatar}>
                        <ImportantDevices/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={adapter.shortDescription}
                      secondary={adapter.name}
                    />
                    <ListItemSecondaryAction>
                      <Link to={{pathname: '/adapter', state: {adapter: adapter}}} style={{textDecoration: 'none'}}>
                        <IconButton aria-label="Edit">
                          <Edit/>
                        </IconButton>
                      </Link>
                      <IconButton aria-label="Delete" onClick={() => this.deleteAdapter(adapter)}>
                        <Delete/>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>,
                )}
              </List>
            </div>
          </div>
          <Route
            path="/adapter"
            render={({props}) => (
              <AdapterView adapter={this.props.adapter}/>
            )}
          />
        </div>
      </Router>
    );
  }

}

AdaptersList.propTypes = {
  klienter: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {}
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({deleteAdapter: deleteAdapter}, dispatch);
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, matchDispatchToProps)(AdaptersList)));





