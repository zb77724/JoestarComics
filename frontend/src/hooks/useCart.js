import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

export const useCart = () => {
    // -------------> Obtain data from context
    const context = useContext(CartContext);

    // -------------> Check if context is not null
    if (!context) {
        throw new Error("useCart should only be used within a CartContextProvider");
    }


    return context;

};