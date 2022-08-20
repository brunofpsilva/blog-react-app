
import { useContext } from 'react';
import { GlobalContext } from '../providers/GlobalContextProvider';

// ----------------------------------------------------------------------

const useGlobalState = () => useContext(GlobalContext);

export default useGlobalState;