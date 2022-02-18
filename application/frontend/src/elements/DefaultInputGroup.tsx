import React, { ReactNode } from 'react';

const DefaultInputGroup = (props: { children: ReactNode }): JSX.Element => {
    return <div className='my-5 max-w-xl'>
        {props.children}
    </div>
};

export default DefaultInputGroup;
