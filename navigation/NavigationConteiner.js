import React, {useEffect, useRef} from 'react';
import ProductsNavigator from "./shopNavigator";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";


function NavigationConteiner(props) {

    //the ProductNavigator is down. And only screen inside the navigator gets navigation props to navigate to other screens
    //so we use a reference of ProductsNavigator with useRef
    const navRef = useRef();

    // !! forces the const to be true or false
    const isAuth = useSelector(state => !!state.auth.token);
    
    useEffect(() => {
        if (!isAuth) {
            //reference has a "current" property
            navRef.current.dispatch(NavigationActions.navigate({routeName: "Auth"}));
        }
    }, [isAuth])

    //simply return the main navigator. we do it like this to use redux-store
    //ref establishes a connection bettween a reference and a jsx element
    return <ProductsNavigator ref={navRef} />
}

export default NavigationConteiner;
