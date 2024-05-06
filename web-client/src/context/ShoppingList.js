// ** React Imports
import { createContext, useState, useEffect } from "react";

const ShoppingListContext = createContext({
  list: [],
  add: () => {},
  remove: () => {},

  open: false,
  setOpen: () => {},
});

const ShoppingListProvider = ({ children }) => {
  // ** States
  const [shoppingList, setShoppingList] = useState([]); // { name: "item", quantity: 1}
  const [open, setOpen] = useState(false);

  const values = {
    list: shoppingList,
    add: (ingredients) => {
      for (let item of ingredients) {
        const cleanedItemName =
          item.trim().charAt(0).toUpperCase() + item.trim().slice(1);
        const index = shoppingList.findIndex((i) => i.name === cleanedItemName);
        if (index !== -1) {
          setShoppingList((prev) => {
            const newList = [...prev];
            newList[index].quantity += 1;
            return newList;
          });
        } else {
          setShoppingList((prev) => [
            ...prev,
            { name: cleanedItemName, quantity: 1 },
          ]);
        }
      }
    },
    remove: (index) => {
      setShoppingList((prev) => {
        const newList = [...prev];
        newList.splice(index, 1);
        return newList;
      });
    },
    clear: () => {
        setShoppingList([]);
    },
    open,
    setOpen,
  };

  useEffect(() => {
    if (shoppingList.length)
      localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    if (localStorage.getItem("shoppingList"))
      setShoppingList(JSON.parse(localStorage.getItem("shoppingList")));
  }, []);

  return (
    <ShoppingListContext.Provider value={values}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const ShoppingListConsumer = ShoppingListContext.Consumer;

export { ShoppingListContext, ShoppingListProvider };
