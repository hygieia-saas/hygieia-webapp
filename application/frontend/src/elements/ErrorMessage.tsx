import React, { Fragment } from 'react';
import FormElementError from './FormElementError';

const ErrorMessage = ({ message }: { message: null | string }): JSX.Element => (
    ((message !== null) && <div className='max-w-xl'><FormElementError data-testid='errorMessageAlert'>{ message }</FormElementError></div>) || <Fragment />
);

export default ErrorMessage;
