import React from 'react';

type InputProps = React.ComponentProps<'button'>;

const Button = (props: InputProps): JSX.Element => {
    return <button
        {...props}
        className='
            group
            relative
            w-full
            max-w-xl
            flex
            justify-center
            py-2
            px-4
            border
            border-transparent
            text-sm
            font-medium
            rounded-md
            text-white
            bg-indigo-600
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
        '
    />;
};

export default Button;
