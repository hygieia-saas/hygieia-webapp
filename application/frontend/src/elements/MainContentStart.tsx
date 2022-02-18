import React, { ReactNode } from 'react';

const MainContentStart = (props: { children: ReactNode }): JSX.Element => {

    return <div id='main-content-start'>
        <div id='main-content-start-inner'>
            {props.children}
        </div>
    </div>;
};

export default MainContentStart;
