import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import Colors from "../../constants/Colors";
import {useSelector, useDispatch} from 'react-redux';
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";
import Card from '../../components/UI/Card';

const CartScreen = props => {

    const cartTotal = useSelector(state => state.cart);
    const {totalAmount, items} = cartTotal;

    const dispatch = useDispatch();

    const cartItems = [];
    for (const key in items) {
        cartItems.push({
            productId: key,
            productTitle: items[key].productTitle,
            productPrice: items[key].productPrice,
            quantity: items[key].quantity,
            sum: items[key].sum
        })
    };
    const sortedcartItems = cartItems.sort((a,b) => a.productId > b.productId ? 1 : -1)

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText} >Total: <Text style={styles.amount}>${Math.round(totalAmount.toFixed(2) * 100 ) / 100}</Text></Text>
                <Button title='Order Now' disabled={cartItems.length === 0} onPress={()=>{dispatch(orderActions.addOrder(sortedcartItems, totalAmount))}} />
            </Card>
            <View>
                <FlatList data={sortedcartItems} keyExtractor={item => item.productId} renderItem={itemData => <CartItem item={itemData.item} deletabale={true} onRemove={() => {dispatch(cartActions.deleteFromCart(itemData.item.productId))}} />}/>
            </View>
        </View>
    );
};

CartScreen.navigationOptions = data => {
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