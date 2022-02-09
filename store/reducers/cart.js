import { ADD_TO_CART, DELETE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;
            const pushToken = addedProduct.ownerPushToken;

            let updatedOrNewItem;

            if (state.items[addedProduct.id]) {
                updatedOrNewItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    pushToken,
                    state.items[addedProduct.id].sum + productPrice
                );
            } else {
                updatedOrNewItem = new CartItem(1, productPrice, productTitle, pushToken, productPrice);
            }

            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewItem },
                totalAmount: state.totalAmount + productPrice
            }
        case DELETE_FROM_CART:
            const { productId } = action;
            const selectedCartItem = state.items[productId];
            const currentQty = state.items[productId].quantity;

            let updatedCartItems;

            if (currentQty > 1) {
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                );

                updatedCartItems = { ...state.items, [action.productId]: updatedCartItem }
                console.log(updatedCartItems)
            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[productId];
            };

            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            }
        case DELETE_PRODUCT:
            const updatedItems = { ...state.items };

            if (!updatedItems[action.productId]) { return state };
            
            delete updatedItems[action.productId];
            const itemTotal = state.items[action.productId].sum;
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }
        case ADD_ORDER:
            return initialState;
    }
    return state;
};