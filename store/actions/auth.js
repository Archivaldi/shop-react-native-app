
//pakage for saving data on the hard drive of the device
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY, LOCAL_CONFIG } from "@env";

export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const AUTHENTICATE = "AUTHENTICATE";

export const authanticate = (userId, token) => {
    return { type: AUTHENTICATE, userId, token }
}

export const signup = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, returnSecureToken: true })
            });

            if (!response.ok) {
                const errResData = await response.json();
                const errId = errResData.error.message;
                throw new Error(errId);
            }

            const responseData = await response.json();

            await console.log('line 22 in auth action', responseData);

            dispatch({
                type: SIGNUP,
                token: responseData.idToken,
                userId: responseData.localId
            });

            //storing date as miliseconds plus miliseconds from the response. That's how we set up the expiration time
            const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000)
            saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);


        } catch (err) {
            throw err;
        }
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, returnSecureToken: true })
            });

            if (!response.ok) {
                const errResData = await response.json();
                const errId = errResData.error.message;
                throw new Error(errId);
            }

            const responseData = await response.json();

            await console.log('line 51 in auth action', responseData);

            dispatch({
                type: SIGNIN,
                token: responseData.idToken,
                userId: responseData.localId
            });
            const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000)
            saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);

        } catch (err) {
            throw err;
        }
    }
};

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({ token, userId, expirationDate: expirationDate.toISOString() }))
};