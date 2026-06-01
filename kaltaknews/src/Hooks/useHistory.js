import {useContext} from 'react';
import { HistoryContext } from '../Contexts/HistoryContext';

const useHistory=()=>{
    return useContext(HistoryContext)
}

export default useHistory;