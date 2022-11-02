import { createContext, ReactNode, useContext } from 'react';
import {
  useQuery,
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from 'react-query';
import { Loader } from '@mantine/core';

import { getMe } from '../api';
import { QueryKeys, Me } from '../types';

const MeContext = createContext<{
  user: Me;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  // @ts-ignore
}>(null);

const MeContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, refetch } = useQuery(QueryKeys.me, getMe);

  return (
    <MeContext.Provider value={{ user: data, refetch }}>
      {isLoading ? <Loader /> : children}
    </MeContext.Provider>
  );
};

const useMe = () => useContext(MeContext);

export { useMe, MeContextProvider };
