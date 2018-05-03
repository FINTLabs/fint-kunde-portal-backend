/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import {Divider, List, ListItem, ListItemIcon, ListItemText} from "material-ui";
import AdapterIcon from 'material-ui-icons/Link';
import ApiIcon from 'material-ui-icons/WebAsset';
import DashboardIcon from 'material-ui-icons/Home';
import DomainIcon from 'material-ui-icons/Domain';
import LogIcon from 'material-ui-icons/Receipt';
import ClientIcon from 'material-ui-icons/ImportantDevices';
import ContactIcon from 'material-ui-icons/Person';
import SupportIcon from 'material-ui-icons/Help';
import DocumentationIcon from 'material-ui-icons/Book';
import Dashboard from "../dashboard/Dashboard";
import {BrowserRouter, Link, Route} from "react-router-dom";
import Clients from "../clients/Clients";
import Adapters from "../adapters/Adapters";
import Kontakter from "../kontakter/Kontakter";
import Klienter from "../klienter/Klienter";
import Contacts from "../contacts/Contacts";
import Apis from "../apis/Apis";
import Organisations from "../organisations/Organisations";
import Logs from "../logs/Logs";
import Support from "../support/Support";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: 1000,
    //marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  menuLink: {
    textDecoration: 'none'
  },
});

class Main extends React.Component {
  state = {
    open: false,
    anchorEl: null,
  };

  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };


  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleRequestClose = () => {
    this.setState({anchorEl: null});
  };

  render() {
    const {classes, theme} = this.props;
    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);


    return (
      <BrowserRouter basename='/'>

        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
              <Toolbar disableGutters={!this.state.open}>
                <IconButton
                  color="contrast"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, this.state.open && classes.hide)}
                >
                  <MenuIcon/>
                </IconButton>
                <Typography type="title" color="inherit" noWrap>
                  Kunde portal
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              type="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
              }}
              open={this.state.open}
            >
              <div className={classes.drawerInner}>
                <div className={classes.drawerHeader}>
                  <IconButton onClick={this.handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                  </IconButton>
                </div>
                <Divider absolute/>
                <List>
                  <Link to="/" className={classes.menuLink}>
                    <ListItem button>
                      <ListItemIcon>
                        <DashboardIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Dashboard"/>
                    </ListItem>
                  </Link>
                  <Link to="/organisations" className={classes.menuLink}>
                    <ListItem button>
                      <ListItemIcon>
                        <DomainIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Organisasjoner"/>
                    </ListItem>
                  </Link>
                  <Link to="/clients" className={classes.menuLink}>
                    <ListItem button>
                      <ListItemIcon>
                        <ClientIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Klienter"/>
                    </ListItem>
                  </Link>
                  <Link to="/apis" className={classes.menuLink}>
                    <ListItem button>
                      <ListItemIcon>
                        <ApiIcon/>
                      </ListItemIcon>
                      <ListItemText primary="API"/>
                    </ListItem>
                  </Link>
                  <Link to="/adapters" className={classes.menuLink}>
                    <ListItem button>
                      <ListItemIcon>
                        <AdapterIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Adapter"/>
                    </ListItem>
                  </Link>
                  <Link to="/contacs" className={classes.menuLink}>
                    <ListItem button>
                      <ListItemIcon>
                        <ContactIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Kontakter"/>
                    </ListItem>
                  </Link>
                  <Link to="/logs" className={classes.menuLink}>
                    <ListItem button>
                      <ListItemIcon>
                        <LogIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Logger"/>
                    </ListItem>
                  </Link>
                  <Link to="/support" className={classes.menuLink}>
                    <ListItem button>
                      <ListItemIcon>
                        <SupportIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Support"/>
                    </ListItem>
                  </Link>
                  <Link to="/documentation" className={classes.menuLink}>
                    <ListItem button>
                      <ListItemIcon>
                        <DocumentationIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Dokumentasjon"/>
                    </ListItem>
                  </Link>
                </List>

              </div>
            </Drawer>
            <main className={classes.content}>
              <div>
                <Route exact path='/' component={Dashboard}/>
                <Route path='/clients' component={Clients}/>
                <Route path='/adapters' component={Adapters}/>
                <Route path='/kontakter' component={Kontakter}/>
                <Route path='/klienter' component={Klienter}/>
                <Route path='/contacts' component={Contacts}/>
                <Route path='/apis' component={Apis}/>
                <Route path='/organisations' component={Organisations}/>
                <Route path='/logs' component={Logs}/>
                <Route path='/support' component={Support}/>

              </div>
            </main>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Main);
