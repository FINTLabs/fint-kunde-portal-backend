import React, {Component} from 'react';
import {Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography, withStyles} from "material-ui";
import {green} from 'material-ui/colors';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import ContactIcon from 'material-ui-icons/Person';
import AdapterIcon from 'material-ui-icons/Link';
import ApiIcon from 'material-ui-icons/WebAsset';
import ClientIcon from 'material-ui-icons/ImportantDevices';


const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        width: '100%',
    },
    cardContent: {
        textAlign: 'center',
    },
    cardLink: {
        textDecoration: 'none'
    },
    avatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: green[500],
    }

});


class Dashboard extends Component {

    render() {
        const {classes} = this.props;

        return (
            <Grid container xs={12}>
                <Grid item xs={3}>
                    <Link to="clients" className={classes.cardLink}>
                        <Card className={classes.card}>
                            <CardHeader
                                title="Klienter"
                                avatar={
                                    <Avatar className={classes.avatar}>
                                        <ClientIcon className={classes.avatar}/>
                                    </Avatar>
                                }
                                subheader="Antall"
                            />
                            <Divider/>
                            <CardContent className={classes.cardContent}>
                                <Typography type="display4">
                                    25
                                </Typography>
                            </CardContent>

                        </Card>
                    </Link>
                </Grid>
                <Grid item xs={3}>
                    <Link to="adapters" className={classes.cardLink}>

                        <Card className={classes.card}>
                            <CardHeader
                                title="Adapter"
                                avatar={
                                    <Avatar className={classes.avatar}>
                                        <AdapterIcon className={classes.avatar}/>
                                    </Avatar>
                                }
                                subheader="Antall"
                            />
                            <Divider/>
                            <CardContent className={classes.cardContent}>
                                <Typography type="display4">
                                    5
                                </Typography>
                            </CardContent>

                        </Card>
                    </Link>
                </Grid>
                <Grid item xs={3}>
                    <Link to="apis" className={classes.cardLink}>
                        <Card className={classes.card}>
                            <CardHeader
                                title="API"
                                avatar={
                                    <Avatar className={classes.avatar}>
                                        <ApiIcon className={classes.avatar}/>
                                    </Avatar>
                                }
                                subheader="Antall"
                            />
                            <Divider/>
                            <CardContent className={classes.cardContent}>

                                <Typography type="display4">
                                    5
                                </Typography>
                            </CardContent>

                        </Card>
                    </Link>
                </Grid>
                <Grid item xs={3}>
                    <Link to="contacts" className={classes.cardLink}>

                        <Card className={classes.card}>
                            <CardHeader
                                title="Kontakter"
                                avatar={
                                    <Avatar className={classes.avatar}>
                                        <ContactIcon className={classes.avatar}/>
                                    </Avatar>
                                }
                                subheader="Antall"
                            />
                            <Divider/>
                            <CardContent className={classes.cardContent}>
                                <Typography type="display4">
                                    3
                                </Typography>
                            </CardContent>

                        </Card>
                    </Link>
                </Grid>
            </Grid>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);