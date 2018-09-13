import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import ClientIcon from "@material-ui/icons/ImportantDevices";
import AutoHideNotification from "../../common/notification/AutoHideNotification";
import ClientView from "./view/ClientView";
import { withContext } from "../../data/context/withContext";
import FeatureHelperText from "../../common/help/FeatureHelperText";
import WarningMessageBox from "../../common/message-box/WarningMessageBox";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center"
  },
  componentList: {
    width: "75%"
  },
  title: {
    paddingLeft: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit
  },
  listItem: {
    borderBottom: "1px dashed lightgray"
  },
  itemAvatar: {
    color: "#fff",
    backgroundColor: theme.palette.secondary.main
  }
});

class ClientList extends Component {
  editClient = (client) => {
    this.setState({
      open: true,
      clientToEdit: client
    });
  };
  onCloseEdit = () => {
    this.setState({ open: false });
  };
  updateClient = (client) => {
    const { currentOrganisation } = this.props.context;
    this.props.updateClient(client, currentOrganisation.name);
  };
  deleteClient = (client) => {
    const { currentOrganisation } = this.props.context;
    this.props.deleteClient(client, currentOrganisation.name);
    this.setState({
      notify: true,
      clientDeletedName: client.name
    });
  };

  askToDelete = (client) => {
    this.setState({
      askToDelete: true,
      message: `Er du sikker på at du vil slette '${client.shortDescription}'? Endringen kan ikke tilbakestilles!`,
      clientToDelete: client
    });
  };

  onCloseDelete = (confirmed) => {
    this.setState({
      askToDelete: false
    });

    if (confirmed) {
      this.deleteClient(this.state.clientToDelete);
    }
  };

  onCloseNotification = () => {
    this.setState({
      notify: false
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      clients: this.props.clients,
      clientToEdit: null,
      clientToDelete: null,
      open: false,
      notify: false,
      clientDeletedName: null,
      askToDelete: false,
      message: '',
    };

  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AutoHideNotification
          showNotification={this.state.notify}
          message={`Klienten ${this.state.clientDeletedName} ble slettet!`}
          onClose={this.onCloseNotification}

        />
        <WarningMessageBox
          show={this.state.askToDelete}
          message={this.state.message}
          onClose={this.onCloseDelete}
        />
        <div className={classes.root}>
          <div className={classes.componentList}>
            <FeatureHelperText>
              <p>
                En klient er påloggingsinformasjon som brukes av en integrasjon for å få tilgang til en komponent.
                Dette kan f.eks. være et IDM system, eller en integrasjonsbuss (BizTalk).
              </p>
              <p>
                Klienten må registreres før integrasjonen kan taes i bruk. En integrasjon må få opprettet påloggingsinformasjon
                og bli gitt tilgang til de komponentene det skal levere data for. Påloggingsinformasjonen og informasjon
                om endepunkter må oppgis til den som skal installere og konfigurere integrasjonen.
              </p>
            </FeatureHelperText>
            <Typography variant="headline" className={classes.title}>Klienter</Typography>
            <Divider/>
            <List>
              {this.props.clients.map((client) =>
                <ListItem className={classes.listItem} key={client.dn}>
                  <ListItemAvatar>
                    <Avatar className={classes.itemAvatar}>
                      <ClientIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={client.shortDescription}
                    secondary={client.name}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Edit" onClick={() => this.editClient(client)}>
                      <Edit/>
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => this.askToDelete(client)}>
                      <Delete/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
        </div>
        <ClientView
          open={this.state.open}
          client={this.state.clientToEdit}
          onClose={this.onCloseEdit}
          updateClient={this.updateClient}
        />
      </div>
    );
  }

}

ClientList.propTypes = {
  clients: PropTypes.array.isRequired
};


export default withStyles(styles)(withContext(ClientList));


