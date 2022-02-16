import React from 'react';
import { useEffect } from 'react';
import { withRouter } from 'react-router';
import { History } from 'history';

const ScrollToTop = ({ history }: { history: History }): JSX.Element => {
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        }
    }, [history]);

    return <></>;
}

export default withRouter(ScrollToTop);
