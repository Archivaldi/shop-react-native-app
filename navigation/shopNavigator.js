import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';

//screens 
import AuthScreen, { authScreenNavigationOptions } from '../screens/user/AuthScreen';
import ProductsOverviewScreen, { productOverviewScreenOptions } from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, { productDetailScreenOptions } from '../screens/shop/ProductDetailScreen';
import CartScreen, { cartScreenOptions } from "../screens/shop/CartScreen";
import OrdersScreen, { ordersScreenOptions } from '../screens/shop/OrdersScreen';
import UserProductsScreen, { userProductsScreenOptions } from "../screens/user/UserProductsScreen";
import EditProductScreen, { editProductScreenOptions } from "../screens/user/EditProductScreen";

import Colors from "../constants/Colors";
import { Ionicons } from '@expo/vector-icons';
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

//products stack
const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator screenOptions={defaulNavOptions}>
            <ProductsStackNavigator.Screen
                name="ProductsOverview"
                component={ProductsOverviewScreen}
                options={productOverviewScreenOptions}
            />
            <ProductsStackNavigator.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={productDetailScreenOptions}
            />
            <ProductsStackNavigator.Screen
                name="Cart"
                component={CartScreen}
                options={cartScreenOptions}
            />
        </ProductsStackNavigator.Navigator>
    )
};

//orders stack
const OrdersStackNavigator = createStackNavigator();

export const OrderNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator screenOptions={defaulNavOptions}>
            <OrdersStackNavigator.Screen
                name="Orders"
                component={OrdersScreen}
                options={ordersScreenOptions}
            />
        </OrdersStackNavigator.Navigator>
    )
};

//Admin Navigator

const UserProductsNavigator = createStackNavigator();

export const AdminNavigator = () => {
    return (
        <UserProductsNavigator.Navigator screenOptions={defaulNavOptions}>
            <UserProductsNavigator.Screen name="UserProducts" component={UserProductsScreen} options={userProductsScreenOptions} />
            <UserProductsNavigator.Screen name="EditProduct" component={EditProductScreen} options={editProductScreenOptions} />
        </UserProductsNavigator.Navigator>
    )
};

//drawer navigator 
``
const ShopNavigatorDrawer = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();
    return (
        <ShopNavigatorDrawer.Navigator screenOptions={defaulNavOptions} 
            drawerContent={props => {
                        //need to add props to configure drawerItmes correctly
                        return <View style={{ flex: 1, paddingTop: 20 }}>
                            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                                <DrawerItemList {...props} />
                                <Button title="Logout" color={Colors.primaryColor} onPress={() => {
                                    dispatch(authActions.logout());
                                }} />
                            </SafeAreaView>
                        </View>
                    }}
                    drawerContentOptions={{
                        headerTintColor: Colors.primaryColor,
                        activeTintColor: Colors.primaryColor
                    }}
        > 
            <ShopNavigatorDrawer.Screen name="Products" component={ProductsNavigator} 
                options={{
                            drawerIcon: props =>{
                                props.color = Colors.primaryColor
                                return <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={23} color={props.color} />
                            }
                        }}
            />
            <ShopNavigatorDrawer.Screen name="Orders" component={OrderNavigator} 
                options={{
                            drawerIcon: props => {
                                props.color = Colors.primaryColor
                                return   <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={23} color={props.color} />
                            }
                        }}
            />
            <ShopNavigatorDrawer.Screen name="Admin" component={AdminNavigator} 
                options={{
                            drawerIcon: props => {
                                props.color = Colors.primaryColor
                                return <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} size={23} color={props.color} />
                            }
                        }}
            />
        </ShopNavigatorDrawer.Navigator>
    )
};

//Auth Stack

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={defaulNavOptions}>
            <AuthStackNavigator.Screen name="Auth" component={AuthScreen} 
                options={authScreenNavigationOptions}
            />
        </AuthStackNavigator.Navigator>
    )
};

// const ProductsNavigator = createStackNavigator({
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen
// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={23} color={drawerConfig.tintColor} />
//     },
//     defaultNavigationOptions: defaulNavOptions
// });

// const OrdersNavigator = createStackNavigator({
//     Orders: OrdersScreen
// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={23} color={drawerConfig.tintColor} />
//     },
//     defaultNavigationOptions: defaulNavOptions
// });

// const UserProductsNavigator = createStackNavigator({
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen
// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} size={23} color={drawerConfig.tintColor} />
//     },
//     defaultNavigationOptions: defaulNavOptions
// }
// )

// const ShopNavigator = createDrawerNavigator({
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: UserProductsNavigator
// }, {
//     contentOptions: {
//         activeTintColor: Colors.primaryColor
//     },
//     //adding your own content to the drawer instead of default
//     contentComponent: props => {
//         const dispatch = useDispatch();
//         //need to add props to configure drawerItmes correctly
//         return <View style={{ flex: 1, paddingTop: 20 }}>
//             <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//                 <DrawerNavigatorItems {...props} />
//                 <Button title="Logout" color={Colors.primaryColor} onPress={() => {
//                     dispatch(authActions.logout());
//                 }} />
//             </SafeAreaView>
//         </View>
//     }
// });

// const AuthNavigator = createStackNavigator({
//     Auth: AuthScreen
// }, {
//     defaultNavigationOptions: defaulNavOptions
// })

// const MainNavigator = createSwitchNavigator({
//     Start: StartUpScreen,
//     Auth: AuthNavigator,
//     Shop: ShopNavigator
// })


//export default createAppContainer(MainNavigator)