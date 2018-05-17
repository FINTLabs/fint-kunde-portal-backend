import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';
import {FormControl, IconButton, Input, InputAdornment, InputLabel, TextField} from "material-ui";
import {ContentCopy, Refresh} from "material-ui-icons";
import withStyles from "material-ui/es/styles/withStyles";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import CopyButton from "../../common/CopyButton";
import TabContainer from "../../common/TabContainer";


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  clientSecret: {},
  oauth: {
    marginTop: '20px',
    marginBottom: '10px',
    padding: '10px',
  },
  oauthSecret: {
    width: '100%',
  },
  oauthHeader: {
    marginTop: '10px',
    marginBottom: '20px',
  },
  auth: {
    marginTop: '20px',
    marginBottom: '10px',
    padding: '10px',
  },
  authSecret: {
    width: '100%',
  },
  authHeader: {
    marginTop: '10px',
    marginBottom: '20px',
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});


class ClientTabView extends React.Component {

  handleChange = (event, value) => {
    this.setState({value});
  };
  handleChangeIndex = index => {
    this.setState({value: index});
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  render() {
    const {classes, theme} = this.props;

    return (

      <div className={classes.root}>

        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Generelt"/>
            <Tab label="Autentisering"/>
            <Tab label="OAuth"/>
            <Tab label="Komponenter"/>
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <TextField
              autoFocus
              name="shortDescription"
              label="Kort beskrivelse"
              fullWidth
              onChange={this.props.updateAdapterState}
              value={this.props.klient.shortDescription}
            />
            <TextField
              name="note"
              label="Note"
              multiline
              rows="4"
              onChange={this.props.updateAdapterState}
              value={this.props.klient.note}
              fullWidth
            />
          </TabContainer>

          <TabContainer dir={theme.direction}>
            <FormControl className={classes.authSecret}>
              <InputLabel htmlFor="name">Brukernavn</InputLabel>

              <Input
                margin="dense"
                id="name"
                name="name"
                value={this.props.klient.name}
                disabled
                endAdornment={
                  <CopyToClipboard text={this.props.klient.name}
                                   onCopy={() => {
                                     this.props.onCopy()
                                   }}>
                    <InputAdornment position="end">
                      <CopyButton/>
                    </InputAdornment>
                  </CopyToClipboard>
                }
              />


            </FormControl>
            <FormControl className={classes.authSecret}>
              <InputLabel htmlFor="adornment-password">Hent nytt passord</InputLabel>
              <Input
                disabled
                margin="dense"
                id="adornment-password"
                value=""
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton>
                      <Refresh/>
                    </IconButton>
                    <IconButton>
                      <ContentCopy/>
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </TabContainer>
          <TabContainer dir={theme.direction}>

            <FormControl className={classes.oauthSecret}>
              <InputLabel htmlFor="name">ID</InputLabel>

              <Input
                margin="dense"
                id="id"
                name="name"
                value="73F4CBE6-76CA-4152-A0A2-6C77380C2DDB"
                disabled
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton>
                      <ContentCopy/>
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.oauthSecret}
            >
              <InputLabel htmlFor="adornment-password">Hent hemmelighet</InputLabel>
              <Input
                id="adornment-password"
                disabled
                margin="dense"
                value=""
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton>
                      <Refresh/>
                    </IconButton>
                    <IconButton>
                      <ContentCopy/>
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <div>
              Her kommer tilknyttning til komponenter
            </div>
          </TabContainer>
        </SwipeableViews>

      </div>
    );
  }
}

ClientTabView
  .propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(ClientTabView);
