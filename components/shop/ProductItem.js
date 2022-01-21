import React from "react";
import { View, StyleSheet, Image, Text, Button, TouchableOpacity } from 'react-native';
import Card from "../UI/Card";

const ProductItem = props => {
    return (
        <TouchableOpacity onPress={props.onSelect}>
            <Card style={styles.product}>
                <Image style={styles.image} source={{ uri: props.item.imageUrl }} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{props.item.title}</Text>
                    <Text style={styles.price}>{props.item.price.toFixed(2)}</Text>
                </View>
                <View style={styles.actions}>
                    {props.children}
                </View>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20
    },
    image: {
        width: '100%',
        height: '60%',
        borderRadius: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 5
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: "#888"
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%',
        marginHorizontal: 10
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '20%',
        paddingVertical: 10,
        marginHorizontal: 15
    }
});

export default ProductItem;