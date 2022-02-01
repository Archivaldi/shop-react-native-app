import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createSwitchNavigator } from 'react-navigation';
import { Platform, SafeAreaView, Button, View } from 'react-native';

import StartUpScreen from '../screens/StartUpScreen';
import AuthScreen from '../screens/user/AuthScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

import Colors from "../constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import * as authActions from "../store/actions/auth";

const defaulNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === "android" ? 'white' : Colors.primaryColor

};

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={23} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaulNavOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={23} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaulNavOptions
});

const UserProductsNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} size={23} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaulNavOptions
}
)

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: UserProductsNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primaryColor
    },
    //adding your own content to the drawer instead of default
    contentComponent: props => {
        const dispatch = useDispatch();
        //need to add props to configure drawerItmes correctly
        return <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <DrawerNavigatorItems {...props} />
                <Button title="Logout" color={Colors.primaryColor} onPress={() => {
                    dispatch(authActions.logout());
                }} />
            </SafeAreaView>
        </View>
    }
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaulNavOptions
})

const MainNavigator = createSwitchNavigator({
    Start: StartUpScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
})


export default createAppContainer(MainNavigator)