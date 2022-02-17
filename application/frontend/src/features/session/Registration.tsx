import React from 'react';
import { registerAccountCommand } from './sessionSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ErrorMessage from '../../elements/ErrorMessage';
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

const Registration = (): JSX.Element => {

    const reduxState = useAppSelector(state => state);
    const reduxDispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        handleSubmit,
        handleChange,
        data: credentials,
        errors
    } = useFormWithValidation<ICredentials>({
        validationRules: credentialsSyntacticalValidationRules,
        onSubmit: () => reduxDispatch(registerAccountCommand(credentials)),
        initialValues: {
            email: '',
            password: ''
        },
    });

    if (reduxState.session.isLoggedIn) {
        navigate(ERoutes.home);
        return <></>;
    }

    if (reduxState.session.registrationOperation.justFinishedSuccessfully) {
        navigate(ERoutes.login);
        return <></>;
    }

    return <>
        <Header/>
        <MainContent>
            <MainContentStart>
                <MainHeadline>
                    { reduxState.translations.translations['session.registration.headline'] }
                </MainHeadline>
                <ErrorMessage message={reduxState.session.registrationOperation.errorMessage} />
                <form
                    onSubmit={handleSubmit}
                >
                    <div>
                        <DefaultInputGroup>
                            <input
                                type='text'
                                id='email'
                                data-testid='registration.emailInput'
                                aria-describedby='email-input-help'
                                placeholder={reduxState.translations.translations['session.registration.email.placeholder']}
                                value={credentials.email || ''}
                                onChange={ handleChange('email') }
                            />
                        </DefaultInputGroup>
                        {errors.email && <div id='password-input-help'>{reduxState.translations.translations[errors.email as keyof ITranslations]}</div>}
                    </div>

                    <div>
                        <DefaultInputGroup>
                            <input
                                type='password'
                                id='password'
                                aria-describedby='password-input-help'
                                data-testid='registration.passwordInput'
                                placeholder={reduxState.translations.translations['session.registration.password.placeholder']}
                                value={credentials.password}
                                onChange={ handleChange('password') }
                            />
                        </DefaultInputGroup>
                        {errors.password && <div id='password-input-help'>{reduxState.translations.translations[errors.password as keyof ITranslations]}</div>}
                    </div>

                    <div>
                        {
                            reduxState.session.registrationOperation.isRunning
                            &&
                            <button disabled type='submit'>
                                { reduxState.translations.translations['session.registration.ctaProcessing'] }
                            </button>
                        }
                        {
                            reduxState.session.registrationOperation.isRunning
                            ||
                            <button
                                type='submit'
                                data-testid='registration.submitButton'
                                disabled={credentials.email.length < 1 || credentials.password.length < 1}
                            >
                                { reduxState.translations.translations['session.registration.cta'] }
                            </button>
                        }
                    </div>
                </form>
            </MainContentStart>
        </MainContent>
    </>;
};

export default Registration;
