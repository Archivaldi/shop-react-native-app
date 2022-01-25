
import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
    return async dispatch => {

        //handling request to get all products from the database and handling the errors

        try {
            const response = await fetch('https://react-native-shop-project-default-rtdb.firebaseio.com/products.json');

            //If the response in 200+ range it will be trueish. And falsy if it's not
            if (!response.ok){
                throw new Error('Something went wrong');
            }

            const responseData = await response.json();
            const loadedProducts = [];
    
            for ( const key in responseData){
                const {title, price , description, imageUrl} = responseData[key];
                loadedProducts.push(new Product(key, 'u1', title, imageUrl, description, price))
            }
    
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts
            })
        } catch (error) {
            throw error;
        }

    }
};

export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        productId
    }
};

export const addProduct = (title, imageUrl, description, price) => {
    //redux-thunk. INstead of returning am object right away it returns the dispatch function to make an async code
    return async dispatch => {
        //any async code could be written here
        const response = await fetch('https://react-native-shop-project-default-rtdb.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, imageUrl, description, price})
        });

        const responseData = await response.json();
        console.log(responseData);
        
        dispatch({
            type: ADD_PRODUCT,
            productData: {id: responseData.name, title, imageUrl, price, description}
        });
    }
}

export const editProduct = (productId, title, imageUrl,description) => {
    return{
        type: EDIT_PRODUCT,
        productId,
        productData: {title, imageUrl, description}
    }
}