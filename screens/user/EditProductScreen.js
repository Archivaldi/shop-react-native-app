import React, { useEffect, useCallback, useReducer } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from "../../store/actions/products";
import Input from '../../components/UI/Input';

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
        }

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

const EditProductScreen = props => {

    const productId = props.navigation.getParam("productId");
    const editedProduct = useSelector(state => state.products.userProducts.find(product => product.id === productId));
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''

        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false
    });



    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert("Warning", "Please check errors in the form", [{ text: "Got it" }])
            return;
        };
        if (productId) {
            dispatch(productsActions.editProduct(productId, formState.inputValues.title, formState.inputValues.imageUrl, formState.inputValues.description));
        } else {
            dispatch(productsActions.addProduct(formState.inputValues.title, formState.inputValues.imageUrl, formState.inputValues.description, +formState.inputValues.price))
        }
        props.navigation.goBack();
    }, [dispatch, productId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: REDUCER_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState]);



    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior='padding' keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <Input id="title" onInputChange={inputChangeHandler} label="Title" required errorText="Please enter a valid title" keyboardType='default' autoCorrect returnKey="next" initialValue={editedProduct ? editedProduct.title : ''} isValid={!!editedProduct} />
                    <Input id="imageUrl" onInputChange={inputChangeHandler} label="Image URL" errorText="Please enter a valid image url" required keyboardType='default' returnKey="next" initialValue={editedProduct ? editedProduct.imageUrl : ''} isValid={!!editedProduct} />
                    {!editedProduct &&
                        <Input id="price" onInputChange={inputChangeHandler} label="Price" errorText="Please enter a valid price" required min={0.1} keyboardType='decimal-pad' returnKey="next" />
                    }
                    <Input id="description" onInputChange={inputChangeHandler} label="Description" errorText="Please enter a valid description" required minLength={5} keyboardType='default' multiline numberOfLines={3} initialValue={editedProduct ? editedProduct.description : ''} isValid={!!editedProduct} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

EditProductScreen.navigationOptions = data => {
    return {
        headerTitle: data.navigation.getParam("productId") ? "Edit Product" : "Add Product",
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title='Save' iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} onPress={data.navigation.getParam("submit")} />
                </HeaderButtons>
            )
        }
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    warning: {
        color: "red"
    }
});

export default EditProductScreen;