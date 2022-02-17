import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useAppSelector } from '../app/hooks';
import ERoutes from '../app/routes';

const IfNotLoggedInRedirector = (): JSX.Element => {
    const reduxState = useAppSelector((state) => state);

    const navigate = useNavigate();

    if (!reduxState.session.isLoggedIn) {
        navigate(ERoutes['login']);
    }
    return <></>;
};

export default IfNotLoggedInRedirector;
