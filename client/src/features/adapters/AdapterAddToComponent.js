import React from 'react';
import SearchComponent from '../common/SearchComponent'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogTitle,} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import LoadingProgress from "../../common/LoadingProgress";
import {fetchComponents} from "../../data/redux/dispatchers/component";

const styles = theme => ({});


class AdapterAddToComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adapter: Object.assign({}, this.props.adapter),
      components: this.props.components,
      open: true
    };

  }

  componentWillMount() {
    this.props.fetchComponents();

  }

  state = {
    open: false,
    value: 1,
  };
  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});

  };

  static contextTypes = {
    organisation: PropTypes.string,
    components: PropTypes.array
  };

  handleChange(event, index, value) {
    this.setState({Dialog});

  }

  SelectedItems(items) {

  }

  render() {

    if (!this.props.components) {
      console.log(this.props)
      return <LoadingProgress/>;
    } else {
      return this.renderComponents();
    }
  }

  renderComponents() {

    console.log("this1")
    console.log(this)
    let items = []

    this.props.components.map((component, i) =>
      items[i] = {id: i, value: component.name}
    );
    return (
      <div>
        <Dialog
          fullWidth
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Legg till adapter til Komponent</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="name"
              label="Adapter Navn"
              value={this.state.adapter.name}
              fullWidth
              disabled
            />

            <SearchComponent items={items}
                             placeholder='..Velg komponent '
                             maxSelected={3}
                             multiple={true}
                             onItemsChanged={this.SelectedItems.bind(this)}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" style={{textTransform: 'none'}}>
              Avbryt
            </Button>

          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AdapterAddToComponent.propTypes = {};

function mapStateToProps(state) {
  return {
    components: state.components,

  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({fetchComponents: fetchComponents}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AdapterAddToComponent);
