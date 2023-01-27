import '@/styles/globals.scss';
import { Provider } from 'react-redux';
import store from '@/store';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <title>ShopPay</title>
        <meta
          name='description'
          content='ShopPay-Online shopping service for all of your needs.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />;
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}
