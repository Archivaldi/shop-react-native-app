import React, {useState, useReducer, useCallback, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Button, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import {API_KEY, LOCAL_CONFIG} from "@env";

import * as authActions from "../../store/actions/auth";

import Input from "../../components/UI/Input";
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

const REDUCER_UPDATE = "REDUCER_UPDATE";

const formReducer = (state, action) => {
    if (action.type === REDUCER_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };

        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };

        let formIsValid = true;

        for (const key in updatedValidities) {
            formIsValid = formIsValid && updatedValidities[key];
        }

        return {
            formIsValid, inputValues: updatedValues, inputValidities: updatedValidities
        }
    }

    return state;
}


const AuthScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [isSignup, setIsSignup] = useState(false);

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''

        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error, [{text: 'Okay'}]);
        }
    }, [error])


    const dispatch = useDispatch();

    const authHandler = async () => {
        setError(null);
        let action;

        if (isSignup) {
           action =  authActions.signup(formState.inputValues.email, formState.inputValues.password);
        } else {
            action = authActions.login(formState.inputValues.email, formState.inputValues.password);
        };
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Shop');
        } catch (e) {
            setError(e.message);
            setIsLoading(false);
        }
    };

    // const singinHandler = () => {
    //     dispatch(authActions.login(formState.inputValues.email, formState.inputValues.password))
    // };

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: REDUCER_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState]);


    return (
        <View style={styles.screen} >
            <LinearGradient colors={['white', Colors.primaryColor]} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input id='email' label="E-Mail" keyboardType='email-address' required email autoCapitalize='none' errorText='Please enter a valid email address' onInputChange={inputChangeHandler} initialValue='' />
                        <Input id='password' label="Password" minLength={5} required autoCapitalize='none' errorText='Please enter a valid password' onInputChange={inputChangeHandler} initialValue='' />
                        <View style={styles.buttonContainer}>{isLoading ? (<ActivityIndicator size='small' color={Colors.primaryColor} />) :  (<Button title={isSignup ? "Sign Up" : 'Login'} color={Colors.primaryColor} onPress={authHandler} />)}</View>
                        <View style={styles.buttonContainer}><Button title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`} color={Colors.accentColor} onPress={() => {setIsSignup(prevState => !prevState)}} /></View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </View>
    );
};

AuthScreen.navigationOptions = data => {
    return {
        headerTitle: "Welcome"
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    authContainer: {
        marginVertical: 20,
        width: '90%',
        paddingHorizontal: 20,
        maxWidth: 400,
        height: '40%',
        maxHeight: 400
    },
    buttonContainer: {
        marginTop: 10
    }
});


export default AuthScreen;
