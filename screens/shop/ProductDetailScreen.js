import React from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from "../../store/actions/cart";
import Colors from '../../constants/Colors';

const ProductDetailScreen = props => {
    const dispatch = useDispatch();
    const productId = props.route.params?.productId;
    const selectedProduct = useSelector(state => state.products.availableProducts.find(product => product.id === productId));
    return (
        <ScrollView>
            <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
            <View style={styles.actions}>
                <Button color={Colors.primaryColor} title='Add to Card' onPress={() => { 
                    dispatch(cartActions.addToCart(selectedProduct))
                }} />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: "center"
    },
    price: {
        fontSize: 20,
        color: "#888",
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'open-sans-bold'
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }
});

export const productDetailScreenOptions = (data) => {
    return {
        headerTitle: data.route.params.title
    }
}

export default ProductDetailScreen;