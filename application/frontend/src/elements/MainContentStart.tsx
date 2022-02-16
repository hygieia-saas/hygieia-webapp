import React, { ReactNode } from 'react';

const MainContentStart = (props: { children: ReactNode }): JSX.Element => {
    return <Col id='main-content-start' className='d-md-flex justify-content-center'>
        <div id='main-content-start-inner'>
            {props.children}
        </div>
    </Col>;
};

export default MainContentStart;
