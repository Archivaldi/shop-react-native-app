import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as authActions from "../store/actions/auth";
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";

function StartUpScreen(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate("Auth");
                return;
            };

            const transformedData = JSON.parse(userData);
            const { token, userId, expirationDate } = transformedData;
            console.log(transformedData);
            const expiryDate = new Date(expirationDate);
            const expirationTime = expiryDate.getTime() - new Date().getTime();

            if (expiryDate <= new Date() || !token || !userId){
                props.navigation.navigate("Auth");
                return;
            };

            dispatch(authActions.authanticate(userId, token, expirationTime));
            props.navigation.navigate('Shop');
        };

        tryLogin();
    }, [])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Colors.primaryColor} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartUpScreen;
