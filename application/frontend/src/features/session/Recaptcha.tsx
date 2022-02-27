import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { sessionSlice } from './sessionSlice';

export const Recaptcha = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);
    const reduxDispatch = useAppDispatch();

    return <>
        {
            reduxState.session.recaptchaResponseKey === null
            &&
            <>
                <ReCAPTCHA
                    sitekey='6LfP3qAeAAAAAGHgjeDI1lF3Wby9HfFrMLKcF4Xe'
                    theme={reduxState.uiSettings.darkMode ? 'dark' : 'light'}
                    hl={reduxState.translations.iso639_1LanguageCode}
                    badge='bottomright'
                    onChange={(value) => {
                        reduxDispatch(sessionSlice.actions.setRecaptchaValue(value))
                    }}
                />
            </>
        }
    </>
};
