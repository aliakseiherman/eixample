import React from 'react'
// import AuthService from './Services/AuthService'
import { Redirect, Route } from 'react-router-dom'
import store from '../store/store';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const isLoggedIn = store.getState().data.user !== null;
    
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    )
            }
        />
    )
}

export default PrivateRoute