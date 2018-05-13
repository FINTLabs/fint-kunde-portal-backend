import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogTitle,} from 'material-ui/Dialog';
import {Divider, Table, TableCell, TableRow, withStyles} from "material-ui";
import PropTypes from 'prop-types';


const styles = (theme) => ({
  dialogTitle: {
    backgroundColor: theme.palette.secondary.main,
  },
  endpointMainTitle: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  endpointsCell: {
    paddingLeft: theme.spacing.unit * 5,
  }
});

class ComponentsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.show,
    };
    console.log("table");
    console.log(props.component);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.show !== prevState.show) {
      return {
        open: nextProps.show,
      };
    }
    return null;
  }

  handleClose = () => {
    this.setState({open: false});
    this.props.onClose();
  };

  render() {
    const {classes} = this.props;
    const component = Object.assign({}, this.props.component);
    return (
      <div>
        <div>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth="md"
          >
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Komponent: {component.description}</DialogTitle>
            <DialogContent>

              <Table className={classes.table}>
                <TableRow>

                  <TableCell variant='head'>Teknisk Navn</TableCell>
                  <TableCell variant='body'>{component.name}</TableCell>
                </TableRow>
                <TableRow>

                  <TableCell variant='head'>Beskrivelse</TableCell>
                  <TableCell variant='body'>{component.description}</TableCell>
                </TableRow>
                <TableRow>

                  <TableCell variant='head'>Sti</TableCell>
                  <TableCell variant='body'>{component.basePath}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant='head' colSpan={2} className={classes.endpointMainTitle}>Endepunkter</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant='head' className={classes.endpointsCell}>Produksjon</TableCell>
                  <TableCell variant='body'><a target="_blank" href={`https://api.felleskomponent.no${component.basePath}`}>https://api.felleskomponent.no{component.basePath}</a></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant='head' className={classes.endpointsCell}>Beta</TableCell>
                  <TableCell variant='body'><a target="_blank" href={`https://beta.felleskomponent.no${component.basePath}`}>https://beta.felleskomponent.no{component.basePath}</a></TableCell>
                </TableRow>
                <TableRow>

                  <TableCell variant='head' className={classes.endpointsCell}>Play-with-FINT</TableCell>
                  <TableCell variant='body'><a target="_blank" href={`https://play-with-fint.felleskomponent.no${component.basePath}`}>https://play-with-fint.felleskomponent.no{component.basePath}</a></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant='head' colSpan={2} className={classes.endpointMainTitle}>Swagger</TableCell>
                </TableRow>
                <TableRow>

                  <TableCell variant='head' className={classes.endpointsCell}>Produksjon</TableCell>
                  <TableCell variant='body'><a target="_blank" href={`https://api.felleskomponent.no${component.basePath}/swagger-ui.html`}>https://api.felleskomponent.no{component.basePath}/swagger-ui.html</a></TableCell>
                </TableRow>
                <TableRow>

                  <TableCell variant='head' className={classes.endpointsCell}>Beta</TableCell>
                  <TableCell variant='body'><a target="_blank" href={`https://beta.felleskomponent.no${component.basePath}/swagger-ui.html`}>https://beta.felleskomponent.no{component.basePath}/swagger-ui.html</a></TableCell>
                </TableRow>
                <TableRow>

                  <TableCell variant='head' className={classes.endpointsCell}>Play-with-FINT</TableCell>
                  <TableCell variant='body'><a target="_blank" href={`https://play-with-fint.felleskomponent.no${component.basePath}/swagger-ui.html`}>https://play-with-fint.felleskomponent.no{component.basePath}/swagger-ui.html</a></TableCell>
                </TableRow>
              </Table>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="secondary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    )

  }
}


ComponentsView.propTypes = {
  show: PropTypes.bool.isRequired,
  //component: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default withStyles(styles)(ComponentsView);
