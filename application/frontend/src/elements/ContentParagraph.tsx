import React, { ReactNode } from 'react';

const ContentParagraph = (props: { children: ReactNode }): JSX.Element => {
    return <p className='text-black dark:text-gray-400'>
        {props.children}
    </p>
};

export default ContentParagraph;
