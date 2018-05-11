import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import {TextField} from "material-ui";
import withStyles from "material-ui/es/styles/withStyles";

function TabContainer({children, dir}) {
  return (
    <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

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


class AdapterTabView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({value});
  };

  handleChangeIndex = index => {
    this.setState({value: index});
  };

  render() {
    const {classes, theme} = this.props;

    return (
    		
      <div>

      <TextField
      margin="dense"
      required
      name="name"
      label="Adapter Navn"
      value={this.props.adapter.name}
      fullWidth
      onChange={this.updateAdapterState}
      disabled
    />


    <TextField
      autoFocus
      name="shortDescription"
      label="Kort beskrivelse"
      fullWidth
      onChange={this.props.updateAdapterState}
      value={this.props.adapter.shortDescription}
    />
    <TextField
      autoFocus
      name="clientId"
      label="Klient Id"
      fullWidth
      onChange={this.props.updateAdapterState}
      value={this.props.adapter.clientId}
      disabled
    />
    <TextField
      name="note"
      label="Note"
      multiline
      rows="4"
      onChange={this.props.updateAdapterState}
      value={this.props.adapter.note}
    />
    <TextField
      name="Komponenter"
      label="Komponenter"
      fullWidth

    />
    <dl>
      {this.props.adapter.components.map(component => {
        return (<div key={component.dn}>
            <dt>{component.substr(3, component.indexOf(',') - 3)}</dt>
          </div>
        )
      })
      }
    </dl>

      </div>
    );
  }
}

AdapterTabView
  .propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(AdapterTabView);
