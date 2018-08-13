import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Tooltip, withStyles} from "@material-ui/core";
import {ContentCopy} from "@material-ui/icons";
import ClientApi from "../../../data/api/ClientApi";
import * as PasswordGenerator from "generate-password";
import GetSecretIcon from "@material-ui/icons/GetApp";
import RefreshIcon from "@material-ui/icons/Refresh";
import {Link} from "react-router-dom";
import {withContext} from "../../../data/context/withContext";
import PropTypes from "prop-types";



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
    marginTop: theme.spacing.unit * 2,
  },
  gotoAssetButton: {
    marginTop: theme.spacing.unit,
  }
});


class ClientTabAuthenticationInformation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allAuthInfo: {
        username: this.props.client.name,
        password: 'topsecret',
        clientId: this.props.client.clientId,
        openIdSecret: ' ',
        assetId: this.props.client.assetId,
      },
    };
  }

  getOpenIdSecret = () => {

    ClientApi.getOpenIdSecret(this.props.client, this.props.context.currentOrganisation.name).then(data => {
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


    ClientApi.setPassword(this.props.client, password, this.props.context.currentOrganisation.name)
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

  render() {
    const {classes} = this.props;
    return (
      <div>
        <FormControl className={classes.authSecret}>
          <InputLabel htmlFor="name">Brukernavn</InputLabel>

          <Input
            margin="dense"
            id="name"
            name="name"
            value={this.props.client.name}
            disabled
            endAdornment={
              <InputAdornment position="end">
                <CopyToClipboard text={this.props.client.name}
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
            type={this.state.allAuthInfo.password === 'topsecret' ? 'password' : 'text'}
            value={this.state.allAuthInfo.password}
            endAdornment={
              <InputAdornment position="end">
                <Tooltip id="tooltip-fab" title="Trykk for å generere nytt passord">
                  <IconButton onClick={() => this.setPassword()}>
                    <RefreshIcon/>
                  </IconButton>
                </Tooltip>
                <CopyToClipboard text={this.state.allAuthInfo.password}
                                 onCopy={() => this.props.notify('Kopiert')}
                >
                  <IconButton disabled={this.state.allAuthInfo.password === 'topsecret'}>
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
            value={this.props.client.clientId}
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


        {this.props.client.assetId ?
          (
            <FormControl className={classes.authSecret}>
              <InputLabel htmlFor="name">RessursId</InputLabel>

              <Input
                margin="dense"
                id="name"
                name="name"
                value={this.props.client.assetId ? this.props.client.assetId : 'Ingen ressursId er tilknyttet enda!'}
                disabled
                endAdornment={
                  <InputAdornment position="end">
                    <CopyToClipboard text={this.props.client.assetId}
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
          ) : (
            <Button className={classes.gotoAssetButton} variant="raised" color="primary" size="small" fullWidth component={Link} to="/assets">
              Klienten har ikke tilordnet en ressursId. Klikk her for å legge til en ressursId.
            </Button>
          )
        }


        < CopyToClipboard text={JSON.stringify(this.state.allAuthInfo, null, 2)}
                          onCopy={() => this.props.notify('Kopiert')}>
          <Button variant="raised" className={classes.copyAllAuthButtonIcon}>
            <ContentCopy/>
            Kopier autentiseringsinformasjon
          </Button>
        </CopyToClipboard>
      </div>
    );
  }
}

ClientTabAuthenticationInformation.propTypes = {
  client: PropTypes.object.isRequired,
  notify: PropTypes.func.isRequired,

};

export default withStyles(styles)(withContext(ClientTabAuthenticationInformation));
