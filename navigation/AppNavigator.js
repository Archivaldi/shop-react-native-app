import React from 'react';
import { useSelector } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { ShopNavigator, AuthNavigator } from "./shopNavigator";
import StartUpScreen from '../screens/StartUpScreen';

function AppNavigator(props) {

    //the ProductNavigator is down. And only screen inside the navigator gets navigation props to navigate to other screens
    //so we use a reference of ProductsNavigator with useRef

    // !! forces the const to be true or false
    const isAuth = useSelector(state => !!state.auth.token);
    const triedLogin = useSelector(state => state.auth.triedLogin);


    //simply return the main navigator. we do it like this to use redux-store
    //ref establishes a connection bettween a reference and a jsx element
    return (
        <NavigationContainer>
            {isAuth && <ShopNavigator />}
            {!isAuth && triedLogin && <AuthNavigator />}
            {!isAuth && !triedLogin && <StartUpScreen />}
        </NavigationContainer>
    )
}

export default AppNavigator;
