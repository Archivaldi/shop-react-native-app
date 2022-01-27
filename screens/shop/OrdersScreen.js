import React, {useEffect, useState} from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from '../../components/shop/OrderItem';
import * as orderActions from "../../store/actions/orders";
import Colors from '../../constants/Colors';

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(orderActions.fetchOrders()).then(() => setIsLoading(false))
    }, [dispatch])

    if (isLoading) {
        return <View style={styles.centered}><ActivityIndicator size='large' color={Colors.primaryColor}/></View>
    }

    return (
        <FlatList data={orders} renderItem={({item}) => {
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
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

export default OrdersScreen;