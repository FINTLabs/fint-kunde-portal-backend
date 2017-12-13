import React, {Component} from 'react';
import 'typeface-roboto';
import {
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    withStyles
} from "material-ui";
import PropTypes from 'prop-types';

import ClientIcon from 'material-ui-icons/ImportantDevices';
import DeleteIcon from 'material-ui-icons/Delete';


const styles = theme => ({});


class Clients extends Component {

    render() {
        //const {classes} = this.props;

        return (
            <Paper>
                <List>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar>
                                <ClientIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Single-line item"
                        />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Delete">
                                <DeleteIcon/>
                            </IconButton>
                            <IconButton aria-label="Delete">
                                <DeleteIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>

                </List>
            </Paper>
        );
    }
}

Clients.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Clients);