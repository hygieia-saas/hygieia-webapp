import React, { ReactNode } from 'react';

const DefaultInputGroup = (props: { children: ReactNode }): JSX.Element => {
    return <InputGroup size="lg" className='shadow-sm'>
        {props.children}
    </InputGroup>
};

export default DefaultInputGroup;
