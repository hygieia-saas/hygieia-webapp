import React, { ReactNode } from 'react';

const MainContent = (props: { children: ReactNode }): JSX.Element => {
    return <Container fluid id='main-content'>
        <Row>
            {props.children}
        </Row>
    </Container>;
};

export default MainContent;
