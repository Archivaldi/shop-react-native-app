import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = "SET_ORDERS";

export const addOrder = (cartItems, totalAmount) => {


    return async (dispatch, getState) => {
        const {token, userId} = getState().auth;
        //saving orders on firebase. After last slash we include "orders". If the orders don't exist it will create
        //a new table. If it does, it will just add a new object into it. Don't forget to include ".json" in the end
        //Also don't forget to JSON.stringify the body
        try {
            const date = new Date();
            const response = await fetch(`https://react-native-shop-project-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cartItems, totalAmount, date: date.toISOString() })
            });

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const responseData = await response.json();


            //this dispatch function is from redux-thunk. We set it up in App.js and don't have to do anything here. Just use this funciton
            dispatch({
                type: ADD_ORDER,
                orderData: {
                    id: responseData.name,
                    items: cartItems,
                    amount: totalAmount,
                    date
                }
            });



            for (const cartItem of cartItems){
                const pushToken = cartItem.productPushToken;

                fetch("https://exp.host/--/api/v2/push/send", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Accept-Encoding": 'dzip, deflate',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        to: pushToken,
                        data: cartItem,
                        title: "An order was placed",
                        body: cartItem.productTitle
                    })
                })
            }

        } catch (err) {
            throw err;
        }
    }
};

export const fetchOrders = () => {

    return async (dispatch, getState) => {
        const {userId} = getState().auth;
        try {
            const response = await fetch(`https://react-native-shop-project-default-rtdb.firebaseio.com/orders/${userId}.json`);
            if (!response.ok) {
                throw new Error("Something went wrong");
            };
            const responseData = await response.json();
            let loadedOrders = [];
            for (const key in responseData) {
                loadedOrders.push(
                    new Order(key, responseData[key].cartItems, responseData[key].totalAmount, new Date(responseData[key].date))
                )
            };

            dispatch({
                type: SET_ORDERS,
                orders: loadedOrders
            });
        } catch (err) {
            throw err;
        }
    }
}