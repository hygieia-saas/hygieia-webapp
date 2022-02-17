import React, { ReactNode } from 'react';

const MainHeadline = (props: { children: ReactNode }): JSX.Element => {
    return <h1>
        {props.children}
    </h1>
};

export default MainHeadline;
