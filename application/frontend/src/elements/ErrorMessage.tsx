import React, { Fragment } from 'react';

const ErrorMessage = ({ message }: { message: null | string }): JSX.Element => (
    ((message !== null) && <Alert variant='danger' className='mt-3 mb-4' data-testid='errorMessageAlert'>{ message }</Alert>) || <Fragment />
);

export default ErrorMessage;
