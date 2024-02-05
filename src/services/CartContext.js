import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const addToCart = (item) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    // const isItemInCart = cartItems.find(
    //   (cartItem) => cartItem._id === item._id
    // );

    // if (isItemInCart.quantity === 1) {
    //   setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
    // } else {
    //   setCartItems(
    //     cartItems.map((cartItem) =>
    //       cartItem._id === item._id
    //         ? { ...cartItem, quantity: cartItem.quantity - 1 }
    //         : cartItem
    //     )
    //   );
    // }
    setCartItems((prevCart) =>
      prevCart.filter((cartItem) => cartItem._id !== item._id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (_id, newQuantity) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item._id === _id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    cartItems.forEach((object) => {
      object["action"] = "remove";
    });
    // const combinedCartItems = Object.entries(cartItems).map(([key, value]) => ({
    //   ...value,
    //   book: { bookname: value.bookname, coverPic: value.coverPic },
    // }));

    // console.log("combinedCartItems", combinedCartItems);g
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
