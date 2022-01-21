export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";

export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        productId
    }
};

export const addProduct = (title, imageUrl, description, price) => {
    return{
        type: ADD_PRODUCT,
        productData: {title, imageUrl, price, description}
    }
}

export const editProduct = (productId, title, imageUrl,description) => {
    return{
        type: EDIT_PRODUCT,
        productId,
        productData: {title, imageUrl, description}
    }
}