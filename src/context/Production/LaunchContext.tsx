import { GetStaticProps } from 'next';
import { createContext, ReactNode, useState } from 'react';
import { LaunchModal } from '../../components/Production/LaunchModal';

interface LaunchContextProviderProps {
  children: ReactNode;
}

interface ILaunchContext {
  launchModalToggle: () => void;
  setEmployees: (employees: IEmployee[]) => void;
  employees: IEmployee[];
}

interface IEmployee {
  id: number;
  name: string;
}

export const LaunchContext = createContext({} as ILaunchContext);

export function LaunchContextProvider({
  children,
}: LaunchContextProviderProps) {
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [employees, setEmployees] = useState([{} as IEmployee]);

  function launchModalToggle() {
    setIsLaunchModalOpen(!isLaunchModalOpen);
  }

  return (
    <LaunchContext.Provider
      value={{
        launchModalToggle,
        setEmployees,
        employees,
      }}
    >
      {children}
      {isLaunchModalOpen && <LaunchModal />}
    </LaunchContext.Provider>
  );
}
