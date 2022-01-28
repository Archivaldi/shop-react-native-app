import React, {useState, useEffect, useCallback} from 'react';
import { View, FlatList, Text, Button, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import * as productActions from "../../store/actions/products";


import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';

const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(undefined);
    
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();

    const loadProducts = useCallback(async() => {
        
        setError(null)
        setIsRefreshing(true);
        try {
            await dispatch(productActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    //if something changes in the database during user's session, his app won't be updated because the app loads only when it launched
    //that's why we need to install the listener that will listen all the changes that are done on the server and reloads the info when the screen is showed
    //this function won't run inititally. Only when the screen is revisited
    useEffect(() => {
        const willFocusSubscription = props.navigation.addListener('willFocus', loadProducts);

        //the function to clean up the listener. Because new listener will be created every time the this function triggers
        return () => {
            willFocusSubscription.remove();
        };
    }, [loadProducts])


    //dispatch returns a promise. We initially set loading to true to get info and use "then" when the info is loaded. But it should be async.
    // But async can't be applied directly into useEffect that;s why we add another function inside and make it async
    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => setIsLoading(false));
    }, [dispatch, loadProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate("ProductDetail", {
            productId: id,
            title
        })
    }

    //if the error was caught, display the error text on the screen and let the user reload the app
    if (error) {
        return(
            <View style={styles.centered}>
                <Text>{error}</Text>
                <Button title="Try again" onPress={loadProducts} color={Colors.primaryColor} />
            </View>
        )
    }

    //if the data is still loading we add a spinner to wait until the data is loaded
    if(isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primaryColor}/>
            </View>
        )
    };

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No Product found. Maybe start adding some</Text>
            </View>
        )
    }

    return (
        <FlatList
        //built in prop in the flatlist. Reloads when "pulled down"
        onRefresh={loadProducts}
        //shoule be added if onRefresh used. Points to variable that shows if we are loading or done loading. isRefreshing in our case
        refreshing={isRefreshing}
        style={styles.screen} data={products} renderItem={itemData => (
            <ProductItem
                item={itemData.item}
                onSelect={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }}
            >
                <Button color={Colors.primaryColor} title="View Details" onPress={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }} />
                <Button color={Colors.primaryColor} title="Add to Cart" onPress={ () => dispatch(cartActions.addToCart(itemData.item)) } />
            </ProductItem>
        )}
        />
    )
};

ProductsOverviewScreen.navigationOptions = data => {
    return {
        headerTitle: "All Products",
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
        },
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title='Cart' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {
                        data.navigation.navigate("Cart");
                    }} />
                </HeaderButtons>
            )
        }
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    centered: {flex: 1, justifyContent: 'center', alignItems: 'center'}
});

export default ProductsOverviewScreen;