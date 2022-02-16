import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ErrorMessage from '../../elements/ErrorMessage';
import { logIntoAccountCommand } from './sessionSlice';
import { Redirect } from 'react-router';
import { useFormWithValidation } from '../../app/hooks/useFormWithValidationHook';
import { credentialsSyntacticalValidationRules, ICredentials } from 'hygieia-webapp-shared';
import MainContentStart from '../../elements/MainContentStart';
import MainHeadline from '../../elements/MainHeadline';
import DefaultInputGroup from '../../elements/DefaultInputGroup';
import ERoutes from '../../app/routes';
import { ITranslations } from '../../app/translationsSlice';
import MainContent from '../../elements/MainContent';
import Header from '../../elements/Header';

const Login = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);
    const reduxDispatch = useAppDispatch();

    const {
        handleSubmit,
        handleChange,
        data: credentials,
        errors
    } = useFormWithValidation<ICredentials>({
        validationRules: credentialsSyntacticalValidationRules,
        onSubmit: () => reduxDispatch(logIntoAccountCommand(credentials)),
        initialValues: {
            email: '',
            password: ''
        },
    });

    if (reduxState.session.isLoggedIn) {
        return (<Redirect push to={ERoutes.home} />);
    }

    return <>
        <Header/>
        <MainContent>
            <MainContentStart>
                {
                    reduxState.session.registrationOperation.justFinishedSuccessfully
                    &&
                    <div className='alert alert-success' data-testid='login.registrationSuccessfulAlert'>Registration finished successfully. Please log in.</div>
                }
                <MainHeadline>
                    { reduxState.translations.translations['session.login.headline'] }
                </MainHeadline>

                <ErrorMessage message={reduxState.session.loginOperation.errorMessage} />

                <form
                    onSubmit={handleSubmit}
                >
                    <Form.Group className='mb-4'>
                        <DefaultInputGroup>
                            <Form.Control
                                id='email'
                                data-testid='login.emailInput'
                                aria-describedby='email-input-help'
                                className={errors.email && 'border-danger'}
                                placeholder={reduxState.translations.translations['session.login.email.placeholder']}
                                value={credentials.email || ''}
                                onChange={ handleChange('email') }
                            />
                        </DefaultInputGroup>
                        {errors.email && <Form.Text className='text-danger' id='email-input-help'>{reduxState.translations.translations[errors.email as keyof ITranslations]}</Form.Text>}
                    </Form.Group>

                    <Form.Group className='mb-4'>
                        <DefaultInputGroup>
                            <Form.Control
                                type='password'
                                id='password'
                                aria-describedby='password-input-help'
                                className={errors.password && 'border-danger'}
                                data-testid='login.passwordInput'
                                placeholder={reduxState.translations.translations['session.login.password.placeholder']}
                                value={credentials.password}
                                onChange={ handleChange('password') }
                            />
                        </DefaultInputGroup>
                        {errors.password && <Form.Text className='text-danger' id='password-input-help'>{reduxState.translations.translations[errors.password as keyof ITranslations]}</Form.Text>}
                    </Form.Group>

                    <InputGroup className="mb-4 justify-content-end">
                        {
                            reduxState.session.loginOperation.isRunning
                            &&
                            <Button disabled type='submit' variant='primary'>
                                { reduxState.translations.translations['session.login.ctaProcessing'] }
                            </Button>
                        }
                        {
                            reduxState.session.loginOperation.isRunning
                            ||
                            <Button
                                type='submit'
                                variant='primary'
                                data-testid='login.submitButton'
                                disabled={credentials.email.length < 1 || credentials.password.length < 1}
                            >
                                { reduxState.translations.translations['session.login.cta'] }
                            </Button>
                        }
                    </InputGroup>
                </form>
            </MainContentStart>
        </MainContent>
    </>;
};

export default Login;
