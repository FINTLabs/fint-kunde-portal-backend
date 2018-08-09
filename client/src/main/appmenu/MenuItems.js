import React from "react";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ClientIcon from "@material-ui/icons/ImportantDevices";
import ApiIcon from "@material-ui/icons/WebAsset";
import AdapterIcon from "@material-ui/icons/Link";
import ContactIcon from "@material-ui/icons/Person";
import LogIcon from "@material-ui/icons/Receipt";
import SupportIcon from "@material-ui/icons/Help";
import DocumentationIcon from "@material-ui/icons/Book";
import RelationTestIcon from "@material-ui/icons/TrendingFlat";
import AssetIcon from "@material-ui/icons/Storage";
import {Link} from "react-router-dom";

const menuLink = {
  textDecoration: 'none'
};

export const MENU_ITEMS = (
  <div>
    <Link to="/" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon/>
        </ListItemIcon>
        <ListItemText primary="Dashboard"/>
      </ListItem>
    </Link>
    <Link to="/components" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <ApiIcon/>
        </ListItemIcon>
        <ListItemText primary="Komponenter"/>
      </ListItem>
    </Link>
    <Link to="/adapters" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <AdapterIcon/>
        </ListItemIcon>
        <ListItemText primary="Adapter"/>
      </ListItem>
    </Link>
    <Link to="/clients" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <ClientIcon/>
        </ListItemIcon>
        <ListItemText primary="Klienter"/>
      </ListItem>
    </Link>
    <Link to="/assets" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <AssetIcon/>
        </ListItemIcon>
        <ListItemText primary="Ressurser"/>
      </ListItem>
    </Link>
    <Link to="/contacts" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <ContactIcon/>
        </ListItemIcon>
        <ListItemText primary="Kontakter"/>
      </ListItem>
    </Link>
    <Link to="/test/linkwalker" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <RelationTestIcon/>
        </ListItemIcon>
        <ListItemText primary="Relasjonstest"/>
      </ListItem>
    </Link>
    <Link to="/logs" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <LogIcon/>
        </ListItemIcon>
        <ListItemText primary="Logger"/>
      </ListItem>
    </Link>
    <Link to="/support" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <SupportIcon/>
        </ListItemIcon>
        <ListItemText primary="Support"/>
      </ListItem>
    </Link>
    <Link to="/documentation" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <DocumentationIcon/>
        </ListItemIcon>
        <ListItemText primary="Dokumentasjon"/>
      </ListItem>
    </Link>
  </div>
);


