import Order from "../../models/order";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
    orders: []
};

export default (state = initialState, {type, orderData}) => {
    switch (type){
        case ADD_ORDER: 
            const newOrder = new Order(new Date().toString(), orderData.items, orderData.amount, new Date());
            return {
                ...state, orders: state.orders.concat(newOrder)
            };
    };

    return state;
}