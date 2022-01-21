import React from 'react';
import { View, Text, Flatlist, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);
    return (
        <FlatList data={orders} renderItem={({item}) => {
            console.log("OrderScreen, line 13", item)
            return (
               <OrderItem
                    totalAmount={item.totalAmount}
                    date={item.readableDate}
                    items={item.items}
               />
            )
            }
        }
        />
    )
};

OrdersScreen.navigationOptions = data => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item 
                        title="Menu"
                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                        onPress={() => {
                            data.navigation.toggleDrawer();
                         }}
                    />
                </HeaderButtons>
            )
        }
    }
}

const styles = StyleSheet.create({

});

export default OrdersScreen;