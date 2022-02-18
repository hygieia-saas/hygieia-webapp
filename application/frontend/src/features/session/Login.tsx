import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ErrorMessage from '../../elements/ErrorMessage';
import { logIntoAccountCommand } from './sessionSlice';
import { useFormWithValidation } from '../../app/hooks/useFormWithValidationHook';
import { credentialsSyntacticalValidationRules, ICredentials } from 'hygieia-webapp-shared';
import MainContentStart from '../../elements/MainContentStart';
import MainHeadline from '../../elements/MainHeadline';
import DefaultInputGroup from '../../elements/DefaultInputGroup';
import ERoutes from '../../app/routes';
import { ITranslations } from '../../app/translationsSlice';
import MainContent from '../../elements/MainContent';
import Header from '../../elements/Header';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../elements/TextInput';
import Button from '../../elements/Button';
import FormElementError from '../../elements/FormElementError';

const Login = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);
    const reduxDispatch = useAppDispatch();
    const navigate = useNavigate();

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
        navigate(ERoutes.home);
        return <></>;
    }

    return <>
        <Header/>
        <MainContent>
            <MainContentStart>
                {
                    reduxState.session.registrationOperation.justFinishedSuccessfully
                    &&
                    <div data-testid='login.registrationSuccessfulAlert'>Registration finished successfully. Please log in.</div>
                }
                <MainHeadline>
                    { reduxState.translations.translations['session.login.headline'] }
                </MainHeadline>

                <ErrorMessage message={reduxState.session.loginOperation.errorMessage} />

                <form
                    onSubmit={handleSubmit}
                >
                    <div>
                        <DefaultInputGroup>
                            <TextInput
                                type='text'
                                id='email'
                                data-testid='login.emailInput'
                                aria-describedby='email-input-help'
                                placeholder={reduxState.translations.translations['session.login.email.placeholder']}
                                value={credentials.email || ''}
                                onChange={ handleChange('email') }
                            />
                            {errors.email && <FormElementError id='email-input-help'>
                                {reduxState.translations.translations[errors.email as keyof ITranslations]}
                            </FormElementError>}
                        </DefaultInputGroup>
                    </div>

                    <div>
                        <DefaultInputGroup>
                            <TextInput
                                type='password'
                                id='password'
                                aria-describedby='password-input-help'
                                data-testid='login.passwordInput'
                                placeholder={reduxState.translations.translations['session.login.password.placeholder']}
                                value={credentials.password}
                                onChange={ handleChange('password') }
                            />
                            {errors.password && <FormElementError id='password-input-help'>
                                {reduxState.translations.translations[errors.password as keyof ITranslations]}
                            </FormElementError>}
                        </DefaultInputGroup>
                    </div>

                    <div>
                        {
                            reduxState.session.loginOperation.isRunning
                            &&
                            <Button disabled type='submit'>
                                { reduxState.translations.translations['session.login.ctaProcessing'] }
                            </Button>
                        }
                        {
                            reduxState.session.loginOperation.isRunning
                            ||
                            <Button
                                type='submit'
                                data-testid='login.submitButton'
                                disabled={credentials.email.length < 1 || credentials.password.length < 1}
                            >
                                { reduxState.translations.translations['session.login.cta'] }
                            </Button>
                        }
                    </div>
                </form>
            </MainContentStart>
        </MainContent>
    </>;
};

export default Login;
