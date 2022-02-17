import React, { ReactNode } from 'react';

const MainContent = (props: { children: ReactNode }): JSX.Element => {
    return <div id='main-content'>
        <div>
            {props.children}
        </div>
    </div>;
};

export default MainContent;
