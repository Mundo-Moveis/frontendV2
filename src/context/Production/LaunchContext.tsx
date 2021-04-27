import { GetStaticProps } from 'next';
import { createContext, ReactNode, useState } from 'react';
import { LaunchModal } from '../../components/Production/LaunchModal';

interface LaunchContextProviderProps {
  children: ReactNode;
}

interface ILaunchContext {
  launchModalToggle: (saveEmployee: boolean) => void;
  setEmployees: (employees: IEmployee[]) => void;
  employees: IEmployee[];
  saveEmployeeIdAfterSave: boolean;
  launched: number;
  setLaunched: (param: number) => void;
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
  const [saveEmployeeIdAfterSave, setSaveEmployeeIdAfterSave] = useState(false);

  const [launched, setLaunched] = useState(0);

  function launchModalToggle(saveEmployee: boolean) {
    setIsLaunchModalOpen(!isLaunchModalOpen);
    setSaveEmployeeIdAfterSave(saveEmployee);
  }

  return (
    <LaunchContext.Provider
      value={{
        launchModalToggle,
        setEmployees,
        employees,
        saveEmployeeIdAfterSave,
        launched,
        setLaunched,
      }}
    >
      {children}
      {isLaunchModalOpen && <LaunchModal />}
    </LaunchContext.Provider>
  );
}
