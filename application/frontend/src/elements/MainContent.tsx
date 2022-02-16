import React, { ReactNode } from 'react';
import { Container, Row } from 'react-bootstrap';

const MainContent = (props: { children: ReactNode }): JSX.Element => {
    return <Container fluid id='main-content'>
        <Row>
            {props.children}
        </Row>
    </Container>;
};

export default MainContent;
