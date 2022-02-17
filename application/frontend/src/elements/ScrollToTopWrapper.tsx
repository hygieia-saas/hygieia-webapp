import { useLocation } from 'react-router-dom';
import React, { ReactNode, useLayoutEffect } from 'react';

const ScrollToTopWrapper = (props: { children: ReactNode }): JSX.Element => {
    const location = useLocation();

    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);

    return <>{props.children}</>;
};

export default ScrollToTopWrapper;
