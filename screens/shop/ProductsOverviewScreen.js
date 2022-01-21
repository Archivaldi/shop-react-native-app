import React from 'react';
import { FlatList, Button, StyleSheet, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';


import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate("ProductDetail", {
            productId: id,
            title
        })
    }

    return (
        <FlatList style={styles.screen} data={products} renderItem={itemData => (
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
    }
});

export default ProductsOverviewScreen;