import React from "react";
import TextField from '@material-ui/core/TextField';
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from '@material-ui/core/Grid';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Notification from "../../../components/Notification/Notification";

import http from "../../../helpers/axios-helper";

import { notify } from '../../../helpers/notification-helper';

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    }
}

function Login(props) {

    const { classes } = props;

    const [state, setState] = React.useState({
        username: '',
        password: '',
        rememberMe: true
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.value });
    };

    const handleCheckboxChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    const login = () => {

        http
            .post("Auth/Authenticate", {
                username: state.username,
                password: state.password,
                rememberMe: state.rememberMe
            })
            .then(function (result) {
                if (result.data.token) {
                    localStorage.setItem("token", result.data.token);
                    window.location = "/";
                }
            });
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '400px' }}>
                        <form className={classes.container} noValidate autoComplete="off">
                            <Card>
                                <CardHeader color="info">
                                    <h4>Login</h4>
                                    <p>use <b>admin 123qwe</b> as default credentials</p>
                                </CardHeader>
                                <CardBody>
                                    <div>
                                        <TextField
                                            id="username"
                                            label="Username"
                                            onChange={handleChange('username')}
                                            value={state.username}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            id="password"
                                            label="Password"
                                            type="password"
                                            onChange={handleChange('password')}
                                            value={state.password}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </div>
                                    <div>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={state.rememberMe}
                                                    onChange={handleCheckboxChange('rememberMe')}
                                                    color="primary"
                                                    inputProps={{
                                                        'aria-label': 'secondary checkbox',
                                                    }}
                                                />
                                            }
                                            label="Remember me"
                                        />
                                    </div>
                                    <div>
                                        <Button variant="outlined" color="primary" className={classes.button} onClick={login}>Login</Button>
                                        <Button variant="outlined" color="default" className={classes.button}>Register</Button>
                                    </div>

                                </CardBody>
                            </Card>
                        </form>
                    </div>
                </Grid>
            </Grid >
            <Notification />
        </div>
    );
}

export default withStyles(styles)(Login);