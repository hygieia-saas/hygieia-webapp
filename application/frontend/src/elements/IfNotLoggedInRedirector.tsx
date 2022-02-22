import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAppSelector } from '../app/hooks';
import ERoutes from '../app/routes';

const IfNotLoggedInRedirector = (): JSX.Element => {
    const reduxState = useAppSelector((state) => state);

    if (!reduxState.session.isLoggedIn) {
        return <Navigate to={ERoutes.login}/>;
    }
    return <></>;
};

export default IfNotLoggedInRedirector;
