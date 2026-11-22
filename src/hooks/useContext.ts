
import { useContext } from 'react';
import { GlobalContext } from '../providers/GlobalContext';

// ----------------------------------------------------------------------

const useGlobalState = () => useContext(GlobalContext);

export default useGlobalState;