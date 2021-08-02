import React from 'react';
import styles from './profile.module.scss';

export default function Profile() {
  return (
    <>
      <div className={styles.profile}>
        <img src="/coffeBreak.svg" />
        <h1>Em Manutenção...</h1>
      </div>
    </>
  );
}
