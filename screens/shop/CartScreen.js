import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from "../../constants/Colors";
import {useSelector, useDispatch} from 'react-redux';
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";
import Card from '../../components/UI/Card';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);

    const cartTotal = useSelector(state => state.cart);
    const {totalAmount, items} = cartTotal;

    const dispatch = useDispatch();

    const addOrder = async () => {
        try {
            setError(null);
            setIsLoading(true);
            await dispatch(orderActions.addOrder(sortedcartItems, totalAmount));
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
        }
    }

    const cartItems = [];
    for (const key in items) {
        cartItems.push({
            productId: key,
            productTitle: items[key].productTitle,
            productPrice: items[key].productPrice,
            quantity: items[key].quantity,
            sum: items[key].sum,
            productPushToken: items[key].ownerPushToken
        })
    };
    const sortedcartItems = cartItems.sort((a,b) => a.productId > b.productId ? 1 : -1)

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText} >Total: <Text style={styles.amount}>${Math.round(totalAmount.toFixed(2) * 100 ) / 100}</Text></Text>
                {isLoading ? (<ActivityIndicator size='small' color={Colors.primaryColor}/> ) : (<Button title='Order Now' disabled={cartItems.length === 0} onPress={addOrder} />) }
            </Card>
            <View>
                <FlatList data={sortedcartItems} keyExtractor={item => item.productId} renderItem={itemData => <CartItem item={itemData.item} deletabale={true} onRemove={() => {dispatch(cartActions.deleteFromCart(itemData.item.productId))}} />}/>
            </View>
        </View>
    );
};

export const cartScreenOptions = data => {
    return {
        headerTitle: 'Your Cart'
    }
}

const styles = StyleSheet.create({
    screen: {
         margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primaryColor
    }
});

export default CartScreen;