import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";


class TabContainer extends React.Component {


  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Typography component="div" dir={this.props.dir} style={{padding: 8 * 3}}>
        {this.props.children}
      </Typography>
    );
  }
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

export default TabContainer;
