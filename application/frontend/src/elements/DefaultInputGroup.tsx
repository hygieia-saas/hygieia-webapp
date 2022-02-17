import React, { ReactNode } from 'react';

const DefaultInputGroup = (props: { children: ReactNode }): JSX.Element => {
    return <div>
        {props.children}
    </div>
};

export default DefaultInputGroup;
