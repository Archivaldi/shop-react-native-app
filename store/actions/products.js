
import Product from "../../models/product";
import * as Notifications from "expo-notifications";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
    return async (dispatch, getState) => {

        const { userId } = getState().auth;
        //handling request to get all products from the database and handling the errors

        try {
            const response = await fetch('https://react-native-shop-project-default-rtdb.firebaseio.com/products.json');

            //If the response in 200+ range it will be trueish. And falsy if it's not
            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const responseData = await response.json();
            const loadedProducts = [];

            for (const key in responseData) {
                const { title, price, description, imageUrl, ownerId, ownerPushToken } = responseData[key];
                loadedProducts.push(new Product(key, ownerId, ownerPushToken, title, imageUrl, description, price))
            };

            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
            })
        } catch (error) {
            throw error;
        }

    }
};

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        try {
            const response = await fetch(`https://react-native-shop-project-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Something went wrong");
            };

            dispatch({
                type: DELETE_PRODUCT,
                productId
            })
        } catch (err) {
            throw err
        }
    }
};

export const addProduct = (title, imageUrl, description, price) => {



    //redux-thunk. INstead of returning am object right away it returns the dispatch function to make an async code
    //this dispatch function is from redux-thunk. We set it up in App.js and don't have to do anything here. Just use this funciton
    return async (dispatch, getState) => {

        try {
            let pushToken;
            let permissions = await Notifications.getPermissionsAsync();
            if (!permissions.granted) {
                await Notifications.requestPermissionsAsync();
            };
            permissions = await Notifications.getPermissionsAsync();
            if (!permissions.granted) {
                pushToken = null
            } else {
                pushToken = (await Notifications.getExpoPushTokenAsync()).data;
            }

            const { userId } = getState().auth;
            const token = getState().auth.token;
            //any async code could be written here
            const response = await fetch(`https://react-native-shop-project-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, imageUrl, description, price, ownerId: userId, ownerPushToken: pushToken })
            });

            const responseData = await response.json();
            
            dispatch({
                type: ADD_PRODUCT,
                productData: { id: responseData.name, ownerPushToken: pushToken, title, imageUrl, price, description, ownerId: userId }
            });


        } catch (e) {
            throw e;
        }
    }
}

export const editProduct = (productId, title, imageUrl, description) => {
    //redux-thunk allows to get second argument getState to get current state from redux
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://react-native-shop-project-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, imageUrl, description })
            });

            if (!response.ok) {
                throw new Error("Something went wrong");
            };

            dispatch(
                {
                    type: EDIT_PRODUCT,
                    productId,
                    productData: { title, imageUrl, description }
                }
            )
        } catch (err) {
            throw err
        }
    };
}