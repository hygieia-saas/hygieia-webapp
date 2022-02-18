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
            py-4
            px-4
            border
            border-transparent
            shadow-lg
            shadow-zinc-400
            dark:shadow-zinc-900
            dark:drop-shadow-md
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
            disabled:bg-gray-500
            disabled:text-gray-400
        '
    />;
};

export default Button;
