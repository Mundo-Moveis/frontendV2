import { GetStaticProps } from 'next';
import { useContext } from 'react';
import { LaunchContext } from '../../context/Production/LaunchContext';
import styles from '../../pages/production/productionLaunch.module.scss';

export default function LaunchButtons() {
  const { launchModalToggle } = useContext(LaunchContext);
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.launch}
        onClick={(e) => launchModalToggle(false)}
      >
        Lançamento
      </button>
      <button
        type="button"
        className={styles.groupedLaunch}
        onClick={(e) => launchModalToggle(true)}
      >
        Lançamento Agrupado
      </button>
      <button type="button" className={styles.defect}>
        Defeito
      </button>
      <button type="button" className={styles.reversal}>
        Estorno
      </button>
    </div>
  );
}
