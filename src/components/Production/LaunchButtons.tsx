import { GetStaticProps } from 'next';
import { useContext } from 'react';
import { LaunchContext } from '../../context/Production/LaunchContext';
import styles from '../../pages/production/productionLaunch.module.scss';

interface IEmployee {
  id: number;
  name: string;
}

interface IEmployeeRequest {
  employees: IEmployee[];
}

export default function LaunchButtons() {
  const { launchModalToggle } = useContext(LaunchContext);
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.launch}
        onClick={launchModalToggle}
      >
        Lançamento
      </button>
      <button type="button" className={styles.groupedLaunch}>
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
