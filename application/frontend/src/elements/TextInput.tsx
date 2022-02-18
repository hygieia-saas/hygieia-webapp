import React from 'react';

type InputProps = React.ComponentProps<'input'>;

const TextInput = (props: InputProps): JSX.Element => {
    return <input
        {...props}
        className='appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-800 placeholder-gray-500 text-gray-900 rounded-md dark:bg-gray-700 dark:text-gray-300'
    />;
};

export default TextInput;
