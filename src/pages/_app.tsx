import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { Slide, ToastContainer } from 'react-toastify';
import Application from '@/components/Application';
import 'react-toastify/dist/ReactToastify.css';
import { configure } from 'mobx';
import { observer } from 'mobx-react';

const App = observer(({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>ZC-Invoice</title>
        <meta name="description" content="ZC-Invoice" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer
        toastClassName={'duration-200'}
        className={'duration-200'}
        position="bottom-left"
        bodyClassName={'text-sm rounded-md duration-200'}
        transition={Slide}
      />
      <Application Component={Component} pageProps={pageProps} />
    </>
  );
});

configure({
  enforceActions: 'never'
});
export default appWithTranslation(App);
