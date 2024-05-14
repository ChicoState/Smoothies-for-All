import { useContext } from 'react';
import { ShoppingListContext } from '../context/ShoppingList';

export const useShoppingList = () => useContext(ShoppingListContext);
