import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = props => {
    const {item} = props;
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{item.quantity} </Text>
                <Text style={styles.title}>{item.productTitle}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>{item.sum.toFixed(2)}</Text>
                {props.deletabale && <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} 
                    size={23}
                    color='red'
                />
                </TouchableOpacity>}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'open-sans',
        color: "#888",
        fontSize: 16
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
});

export default CartItem;