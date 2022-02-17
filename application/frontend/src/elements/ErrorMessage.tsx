import React, { Fragment } from 'react';

const ErrorMessage = ({ message }: { message: null | string }): JSX.Element => (
    ((message !== null) && <div data-testid='errorMessageAlert'>{ message }</div>) || <Fragment />
);

export default ErrorMessage;
