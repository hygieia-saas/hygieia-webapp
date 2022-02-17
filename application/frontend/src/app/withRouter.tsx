import {
    useLocation,
    useNavigate,
    useParams
} from 'react-router-dom';
import React, { ReactNode } from 'react';

const withRouter = (Component: typeof React.Component) => {
    return (props: { children: ReactNode }) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
};

export default withRouter;
