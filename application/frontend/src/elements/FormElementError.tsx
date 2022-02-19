import React from 'react';

type InputProps = React.ComponentProps<'div'>;

const FormElementError = (props: InputProps): JSX.Element => {
    return <div
        {...props}
        className='
            block
            w-full
            mt-2
            px-3
            py-2
            border
            border-red-200
            dark:border-none
            text-red-900
            dark:text-gray-400
            bg-red-50
            dark:bg-red-700
            dark:bg-opacity-50
            rounded-md
        '
    >
        {props.children}
    </div>;
};

export default FormElementError;
