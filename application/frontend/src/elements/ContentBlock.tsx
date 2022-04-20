import React, { ReactNode } from 'react';

const ContentBlock = (props: { children: ReactNode }): JSX.Element => {
    return <div className='text-black dark:text-gray-400'>
        {props.children}
    </div>
};

export default ContentBlock;
