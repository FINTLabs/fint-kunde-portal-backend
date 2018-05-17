import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withStyles} from "material-ui";
import LoadingProgress from "../../common/LoadingProgress";
import KlienterList from "./ClientsList";
import ClientAdd from "./ClientAdd";
import {createKlient, deleteKlient, fetchKlienter, updateClient} from "../../data/redux/dispatchers/client";


const styles = () => ({
  root: {}
});

class ClientsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientAdded: false,
    }
  }

  componentDidMount() {
    this.props.fetchKlienter()
  }

  render() {
    if (!this.props.clients) {
      return <LoadingProgress/>;
    } else {
      return this.renderClients();
    }
  }

  renderClients() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <KlienterList klienter={this.props.clients}
                      updateClient={this.props.updateAdapter}
                      deleteKlient={this.props.deleteAdapter}
        />
        <ClientAdd
          createClient={this.props.createClient}
        />
      </div>


    );
  }
}

ClientsContainer.propTypes = {
  //clients: PropTypes.array.isRequired
};

function mapStateToProps(state) {

  return {
    clients: state.client.clients
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchKlienter: fetchKlienter,
    updateClient: updateClient,
    deleteClient: deleteKlient,
    createClient: createKlient,
  }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ClientsContainer));
