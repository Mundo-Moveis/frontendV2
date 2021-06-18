import React from 'react';
import 'antd/dist/antd.css';

import { Header } from '../components/Header';
import { SideBarProvider } from '../context/SideBarContext';

import styles from '../styles/app.module.scss';
import '../styles/global.scss';

import { LaunchContextProvider } from '../context/Production/LaunchContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className={styles.wrapper}>
        <main>
          <LaunchContextProvider>
            <SideBarProvider>
              <Component {...pageProps} />
            </SideBarProvider>
          </LaunchContextProvider>
        </main>
      </div>
    </>
  );
}

export default MyApp;
