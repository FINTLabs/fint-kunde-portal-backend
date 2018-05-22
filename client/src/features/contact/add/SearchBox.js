import React, {Component} from 'react';
import {Button, Input, withStyles} from "material-ui";
import PropTypes from "prop-types";
import AddIcon from "@material-ui/icons/Add";


const styles = theme => ({
  searchContainer: {
    padding: theme.spacing.unit * 2,
    width: '100%',
  },
  searchInput: {
    margin: theme.spacing.unit,
    width: '80%',
  },
  addButton: {
    margin: theme.spacing.unit,
  },

});

class SearchBox extends Component {


  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
    };
  }

  onChangeSearch = (event) => {
    this.setState({
      searchString: event.target.value,
    });
  };

  render() {

    const {classes, placeholder, onSearch} = this.props;
    return (

      <div>
        <div className={classes.searchContainer}>
          <Input
            autoFocus
            value={this.state.searchString}
            placeholder={placeholder}
            className={classes.searchInput}
            inputProps={{
              'aria-label': 'Description',
            }}
            onChange={this.onChangeSearch}
            onKeyUp={() => onSearch(this.state.searchString)}
          />

          <Button onClick={() => alert("add new contact")} variant="fab" color="primary" aria-label="add"
                  className={classes.addButton}>
            <AddIcon/>
          </Button>
        </div>
      </div>

    );
  }

}

SearchBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchBox);
