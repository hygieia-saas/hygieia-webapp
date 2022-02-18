import React, { ReactNode } from 'react';

const MainHeadline = (props: { children: ReactNode }): JSX.Element => {
    return <h1 className='mb-5 text-xl font-bold dark:text-gray-400'>
        {props.children}
    </h1>
};

export default MainHeadline;
