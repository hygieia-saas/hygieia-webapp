import React, { ReactNode } from 'react';

const MainContent = (props: { children: ReactNode }): JSX.Element => {
    return <div id='main-content' className='p-12 min-h-screen bg-gray-100 dark:bg-gray-900'>
        <div>
            {props.children}
        </div>
    </div>;
};

export default MainContent;
