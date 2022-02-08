import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from "redux-thunk";

import productReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";

import AppNavigator from './navigation/AppNavigator';


//set up one root reducer to access any state at any component
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer
});

//set up for redux-thunk
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

enableScreens();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const fetchFonts = () => {
    return Font.loadAsync({
      'open-sans': require("./assets/fonts/OpenSans-Regular.ttf"),
      'open-sans-bold': require("./assets/fonts/OpenSans-Bold.ttf")
    })
  };

  if (!fontsLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontsLoaded(true)} onError={(err) => console.log(err)} />
  };

  return (
    //store is redux-store. We should use Provider to provide the store
    //we have to use additional wrapper around our navigator because we can use redux store in the child component only 
    <Provider store={store}>
      <AppNavigator style={styles.container} />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
