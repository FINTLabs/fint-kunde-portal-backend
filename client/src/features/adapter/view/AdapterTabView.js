import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';
import {FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Tooltip, withStyles} from "material-ui";
import {ContentCopy, Refresh} from "material-ui-icons";
import GetSecretIcon from '@material-ui/icons/GetApp';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import TabContainer from "../../../common/TabContainer";
import AdapterApi from "../../../data/api/AdapterApi";
import PasswordGenerator from "generate-password";
import PropTypes from 'prop-types';
import Button from "material-ui/es/Button/Button";
import AdapterTabComponent from "./AdapterTabComponent";


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  oauthSecret: {
    width: '100%',
  },
  auth: {
    marginTop: '0px',
    marginBottom: '10px',
    padding: '10px',
  },
  authSecret: {
    width: '100%',
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  copyAllAuthButtonIcon: {
    marginRight: theme.spacing.unit,
  },
});


class AdapterTabView extends React.Component {

  handleChange = (event, value) => {
    this.setState({value});

    if (value === 0) {
      this.props.showUpdateButton(true);
    }
    else {
      this.props.showUpdateButton(false);
    }

  };
  handleChangeIndex = index => {
    this.setState({value: index});
  };
  getOpenIdSecret = () => {

    AdapterApi.getOpenIdSecret(this.props.adapter, 'testing').then(data => {
      let allAuthInfo = this.state.allAuthInfo;
      allAuthInfo.openIdSecret = data;
      this.setState({
        allAuthInfo: allAuthInfo,
      })
    });
  };
  generatePassord = () => {
    return PasswordGenerator.generate({
      length: 64,
      numbers: true,
      symbols: true,
      strict: true,
    });
  };
  setPassword = () => {

    let password = this.generatePassord();


    AdapterApi.setPassword(this.props.adapter, password, 'testing')
      .then(response => {
        if (response.status === 200) {
          let allAuthInfo = this.state.allAuthInfo;
          allAuthInfo.password = password;
          this.setState({
            allAuthInfo: allAuthInfo,
          });
        }
      });

  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      allAuthInfo: {
        username: this.props.adapter.name,
        password: ' ',
        clientId: this.props.adapter.clientId,
        openIdSecret: ' ',
      },
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
              value={this.props.adapter.shortDescription}
            />
            <TextField
              name="note"
              label="Note"
              multiline
              rows="4"
              onChange={this.props.updateAdapterState}
              value={this.props.adapter.note}
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
                value={this.props.adapter.name}
                disabled
                endAdornment={
                  <InputAdornment position="end">
                    <CopyToClipboard text={this.props.adapter.name}
                                     onCopy={() => this.props.notify('Kopiert')}
                    >
                      <IconButton>
                        <ContentCopy/>
                      </IconButton>
                    </CopyToClipboard>
                  </InputAdornment>
                }
              />


            </FormControl>

            <FormControl className={classes.authSecret}>
              <InputLabel htmlFor="adornment-password">Passord</InputLabel>
              <Input
                disabled
                margin="dense"
                id="adornment-password"
                value={this.state.allAuthInfo.password}
                endAdornment={
                  <InputAdornment position="end">
                    <Tooltip id="tooltip-fab" title="Trykk for å generere nytt passord">
                      <IconButton onClick={() => this.setPassword()}>
                        <Refresh/>
                      </IconButton>
                    </Tooltip>
                    <CopyToClipboard text={this.state.allAuthInfo.password}
                                     onCopy={() => this.props.notify('Kopiert')}
                    >
                      <IconButton>
                        <ContentCopy/>
                      </IconButton>
                    </CopyToClipboard>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.oauthSecret}>
              <InputLabel htmlFor="name">Klient ID</InputLabel>

              <Input
                margin="dense"
                id="id"
                name="name"
                value={this.props.adapter.clientId}
                disabled
                endAdornment={
                  <InputAdornment position="end">
                    <CopyToClipboard text={this.state.allAuthInfo.clientId}
                                     onCopy={() => this.props.notify('Kopiert')}
                    >
                      <IconButton>
                        <ContentCopy/>
                      </IconButton>
                    </CopyToClipboard>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.oauthSecret}
            >
              <InputLabel htmlFor="adornment-password">Klient Hemmelighet</InputLabel>
              <Input
                id="adornment-password"
                disabled
                margin="dense"
                value={this.state.allAuthInfo.openIdSecret}
                disableUnderline
                multiline
                rows="2"
                endAdornment={
                  <InputAdornment position="end">
                    <Tooltip id="tooltip-fab" title="Trykk for å hente hemmligheten">
                      <IconButton onClick={() => this.getOpenIdSecret()}>
                        <GetSecretIcon/>
                      </IconButton>
                    </Tooltip>
                    <CopyToClipboard text={this.state.allAuthInfo.openIdSecret}
                                     onCopy={() => this.props.notify('Kopiert')}
                    >
                      <IconButton>
                        <ContentCopy/>
                      </IconButton>
                    </CopyToClipboard>
                  </InputAdornment>
                }
              />
            </FormControl>


            <CopyToClipboard text={JSON.stringify(this.state.allAuthInfo, null, 2)}
                             onCopy={() => this.props.notify('Kopiert')}>
              <Button variant="raised">
                <ContentCopy className={classes.copyAllAuthButtonIcon}/>
                Kopier autentiseringsinformasjon
              </Button>
            </CopyToClipboard>

          </TabContainer>

          <TabContainer dir={theme.direction}>
            <div>
              <AdapterTabComponent adapter={this.props.adapter} notify={this.props.notify}/>
            </div>
          </TabContainer>
        </SwipeableViews>

      </div>
    );
  }
}

AdapterTabView.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(AdapterTabView);
