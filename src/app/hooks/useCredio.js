import { useContext } from 'react';
import CredioContext from '../contexts/CredioContext';

const useCredio = () => useContext(CredioContext);

export default useCredio;
