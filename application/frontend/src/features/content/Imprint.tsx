import React from 'react';
import Header from '../../elements/Header';
import MainHeadline from '../../elements/MainHeadline';
import MainContent from '../../elements/MainContent';
import MainContentStart from '../../elements/MainContentStart';
import { useAppSelector } from '../../app/hooks';

const Imprint = (): JSX.Element => {

    const reduxState = useAppSelector((state) => state);

    return <>
        <Header/>
        <MainContent>
            <MainContentStart>
                <MainHeadline>
                    { reduxState.translations.translations['content.imprint.headline'] }
                </MainHeadline>

                <div className='dark:text-white'>
                    {
                        reduxState.translations.iso639_1LanguageCode === 'de'
                        &&
                        <>
                            <h2 className='mt-5 mb-2 font-bold'>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
                            <p>
                                Manuel Kie&szlig;ling<br />
                                Berger Busch 55<br />
                                41515 Grevenbroich
                            </p>

                            <h2 className='mt-5 mb-2 font-bold'>Kontakt</h2>
                            <p>
                                Telefon: +4915115116805<br />
                                E-Mail: manuel@kiessling.net
                            </p>

                            <h2 className='mt-5 mb-2 font-bold'>Umsatzsteuer-ID</h2>
                            <p>
                                Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27 a Umsatzsteuergesetz:<br />
                                DE322239480
                            </p>

                            <h2 className='mt-5 mb-2 font-bold'>Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h2>
                            <p>
                                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                            </p>
                        </>
                    }

                    {
                        reduxState.translations.iso639_1LanguageCode === 'en'
                        &&
                        <>
                            <h2 className='mt-5 mb-2 font-bold'>Information in accordance with Section 5 TMG</h2>
                            <p>
                                Manuel Kie&szlig;ling<br />
                                Berger Busch 55<br />
                                41515 Grevenbroich<br />
                                Germany
                            </p>

                            <h2 className='mt-5 mb-2 font-bold'>Contact</h2>
                            <p>
                                Phone: +4915115116805<br />
                                E-mail: manuel@kiessling.net
                            </p>

                            <h2 className='mt-5 mb-2 font-bold'>Tax ID</h2>
                            <p>
                                Sales tax identification number according to § 27 a sales tax law:<br />
                                DE322239480
                            </p>

                            <h2 className='mt-5 mb-2 font-bold'>Consumer dispute resolution/universal arbitration board</h2>
                            <p>
                                We are not willing or obliged to participate in dispute settlement procedures before a consumer arbitration board.
                            </p>
                        </>
                    }
                </div>

            </MainContentStart>
        </MainContent>
    </>
};

export default Imprint;
