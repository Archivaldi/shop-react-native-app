import React, {useState, useEffect} from 'react';
import { View, Text,Button, FlatList, StyleSheet, Alert, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

import ProductItem from "../../components/shop/ProductItem";

import * as productsActions from "../../store/actions/products";

const UserProductsScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);

    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = productId => {
        props.navigation.navigate("EditProduct", {productId});
    };

    const deleteHandler = id => {
        Alert.alert("Are you sure?", "Do you  really want to delete this item?", 
            [{text: "No", style: 'defaut'},
            {text: "Yes", style: 'destructive', onPress: async () => {
                //setError(undefined);
                setIsLoading(true)
                try {
                    await  dispatch(productsActions.deleteProduct(id));
                } catch (e) {
                    setError(e.message);
                }
            }}] 
            )
            setIsLoading(false);
    };

    useEffect(() => {
        if (error){
            Alert.alert("An error occured", error, [{text: 'Got it'}]);
        }
    }, [error])

    if (isLoading) {
        return <View style={styles.centered} ><ActivityIndicator size='large' color={Colors.primaryColor}/></View>
    }

    return <FlatList data={userProducts} renderItem={product => {

        return (
            <ProductItem
                item={product.item}
                onSelect={() => editProductHandler(product.item.id)}
            >
                <Button color={Colors.primaryColor} title="Edit" onPress={() => editProductHandler(product.item.id)} />
                <Button color={Colors.primaryColor} title="Delete" onPress={() => {
                    deleteHandler(product.item.id)
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default UserProductsScreen;