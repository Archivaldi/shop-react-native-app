import React from 'react';
import { ScrollView, View, StyleSheet, Button, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from "../../components/UI/Input";
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

const AuthScreen = (props) => {
    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={styles.screen} >
            <LinearGradient colors={['white', Colors.primaryColor ]} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input id='email' label="E-Mail" keyboardType='email-address' required email autoCapitalize='none' errorText='Please enter a valid email address' onInputChange={() => { }} initialValue='' />
                        <Input id='password' label="Password" secureTextEntry minLength={5} required email autoCapitalize='none' errorText='Please enter a valid password' onInputChange={() => { }} initialValue='' />
                        <View style={styles.buttonContainer}><Button title="login" color={Colors.primaryColor} onPress={() => { }} /></View>
                        <View style={styles.buttonContainer}><Button title="Sign Up" color={Colors.accentColor} onPress={() => { }} /></View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
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
        height: '30%',
        maxHeight: 400
    },
    buttonContainer: {
        marginTop: 10
    }
});


export default AuthScreen;
