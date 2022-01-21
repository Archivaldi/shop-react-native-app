import React from 'react';
import { Button, FlatList, StyleSheet, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

import ProductItem from "../../components/shop/ProductItem";

import * as productsActions from "../../store/actions/products";
import products from '../../store/reducers/products';
import { Header } from 'react-native/Libraries/NewAppScreen';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = productId => {
        props.navigation.navigate("EditProduct", {productId});
    }

    return <FlatList data={userProducts} renderItem={product => {

        return (
            <ProductItem
                item={product.item}
                onSelect={() => editProductHandler(product.item.id)}
            >
                <Button color={Colors.primaryColor} title="Edit" onPress={() => editProductHandler(product.item.id)} />
                <Button color={Colors.primaryColor} title="Delete" onPress={() => {
                    dispatch(productsActions.deleteProduct(product.item.id))
                }} />
                
            </ProductItem>
        )
    }} />
};

UserProductsScreen.navigationOptions = data => {
    return {
        headerTitle: 'Your products',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => data.navigation.toggleDrawer()} />
                </HeaderButtons>
            )
        },
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} onPress={() => data.navigation.navigate("EditProduct")} />
                </HeaderButtons>
            )
        }
    };
};

const styles = StyleSheet.create({

});

export default UserProductsScreen;