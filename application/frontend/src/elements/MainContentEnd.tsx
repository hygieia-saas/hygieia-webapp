import React, { ReactNode } from 'react';

const MainContentEnd = (props: { children: ReactNode }): JSX.Element => {
    return <Col id='main-content-end' md='4'>
        <div id='main-content-end-inner' className='sticky-top pt-4 opacity-75'>
            {props.children}
        </div>
    </Col>;
};

export default MainContentEnd;
