import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Menu, MenuItem, withStyles} from "@material-ui/core";
import OrganisationIcon from "@material-ui/icons/Domain";
import {withContext} from "../../data/context/withContext";

const styles = (theme) => ({
  root: {
    marginRight: theme.spacing.unit,
  },
  organsationIcon: {
    marginLeft: theme.spacing.unit,
  }
});


class OrganisationSelector extends Component {


  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      organisations: [],
      selectedOrganisation: {},
    };
  }

  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = (organisation) => {
    if (organisation.dn) {
      this.setState({selectedOrganisation: organisation});
      this.props.context.setCurrentOrganisation(organisation);
    }
    this.setState({anchorEl: null});
  };

  render() {
    const {classes} = this.props;
    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);

    if (this.props.context.organisations.length > 0) {
      return (
        <div className={classes.root}>
          <Button
            aria-owns={open ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            {this.props.context.currentOrganisation ? this.props.context.currentOrganisation.displayName : 'Velg organisasjon'}
            <OrganisationIcon className={classes.organsationIcon}/>
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={this.handleClose}
          >
            {this.props.context.organisations.map((organisation) =>
              <MenuItem key={organisation.dn}
                        onClick={() => this.handleClose(organisation)}>{organisation.displayName}</MenuItem>
            )}
          </Menu>
        </div>
      );
    }
    else {
      return (<div/>);
    }
  }
}

OrganisationSelector.propTypes = {
  classes: PropTypes.any.isRequired
};

export default withStyles(styles)(withContext(OrganisationSelector));

