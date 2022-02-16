import { Redirect } from 'react-router-dom';
import React from 'react';
import { useAppSelector } from '../app/hooks';
import ERoutes from '../app/routes';

const IfNotLoggedInRedirector = (): JSX.Element => {
    const reduxState = useAppSelector((state) => state);

    return <>
        {
            reduxState.session.isLoggedIn
            ||
            <Redirect push to={ERoutes['login']} />
        }
    </>;
};

export default IfNotLoggedInRedirector;
