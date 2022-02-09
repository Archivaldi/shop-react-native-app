import Product from "../../models/product";
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, SET_PRODUCTS } from "../actions/products";

const initalState = {
    availableProducts: [],
    userProducts: []
};

export default (state = initalState, action) => {
    switch (action.type) {
        case SET_PRODUCTS: 
            return {
                availableProducts: action.products,
                userProducts: action.userProducts
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.productId),
                availableProducts: state.availableProducts.filter(product => product.id !== action.productId)
            }
        case ADD_PRODUCT:
            const newProduct = new Product(action.productData.id, action.productData.ownerId, action.productData.ownerPushToken, action.productData.title, action.productData.imageUrl, action.productData.description, action.productData.price);
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        case EDIT_PRODUCT:
            const productIndex = state.userProducts.findIndex(product => product.id === action.productId);
            const updatedProduct = new Product(action.productId,state.userProducts[productIndex].ownerId, state.userProducts[productIndex].ownerPushToken, action.productData.title, action.productData.imageUrl, action.productData.description, state.userProducts[productIndex].price);
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;
            const availableProductIndex = state.availableProducts.findIndex(product => product.id === action.productId);
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }
    }
    return state;
}