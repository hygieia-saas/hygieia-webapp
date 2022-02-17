import React, { ReactNode } from 'react';

const MainContentEnd = (props: { children: ReactNode }): JSX.Element => {
    return <div id='main-content-end'>
        <div id='main-content-end-inner'>
            {props.children}
        </div>
    </div>;
};

export default MainContentEnd;
