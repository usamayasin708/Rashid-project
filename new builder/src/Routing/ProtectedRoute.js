import React from "react";
import { Route } from "react-router-dom";
import { AUTH_PROVIDER } from "./AuthProvider"
import { ToastContainer } from 'react-toastify';

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        var isAuthenticated = user.isAuthenticated;
        var userType = user.user_type;
    }
    const redirectHandler = () => {
        window.location.href = AUTH_PROVIDER + '/auth/login';
    }
    return (
        <>
            <Route
                {...restOfProps}
                render={(props) =>
                    isAuthenticated && userType === restOfProps.role ? <Component {...props} /> : redirectHandler()
                }
            />
           
        </>
    );
}

export default ProtectedRoute;