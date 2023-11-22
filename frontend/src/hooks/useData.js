import { DataContext } from '../context/DataContext';
import { useContext } from 'react';

export const useData = () => {
    // -------------> Obtain data from context
    const context = useContext(DataContext);

    // -------------> Check if context is not null
    if (!context) {
        throw new Error("useData should only be used within a DataContextProvider");
    }

    return context;

};