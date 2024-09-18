export  const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // update the cart items
      const updatedCartItems = [...state.cart, action.payload];
      // save the updated cart items in the local storage
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      return { ...state, cart: updatedCartItems };
    case "REMOVE_FROM_CART":
      // update the cart items
      const filteredCartItems = state.cart.filter(
        (item) => item.id !== action.payload
      );
      // save the updated cart items in the local storage
      localStorage.setItem("cart", JSON.stringify(filteredCartItems));
      return { ...state, cart: filteredCartItems };
      case "CLEAR_CART":
      // clear the cart items
      localStorage.removeItem("cart");
      // localStorage.removeItem("PaymentIntent");
      return { ...state, cart: [] };
      case "LOAD_CART_ITEMS":
        // load the cart items from localStorage
        const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
        return { ...state, cart: storedCartItems };
    default:
      return state;
  }
};