
//pakage for saving data on the hard drive of the device
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY, LOCAL_CONFIG } from "@env";

let timer;

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authanticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime))
        dispatch({ type: AUTHENTICATE, userId, token })
    };
};

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

            //storing date as miliseconds plus miliseconds from the response. That's how we set up the expiration time
            const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000)

            dispatch(authanticate(responseData.localId, responseData.idToken, parseInt(responseData.expiresIn) * 1000));

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

            dispatch(authanticate(responseData.localId, responseData.idToken, parseInt(responseData.expiresIn) * 1000));

            const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000)
            saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);

        } catch (err) {
            throw err;
        }
    }
};

export const logout = () => {
        clearLogoutTimer();
        AsyncStorage.removeItem('userData');
        return {type: LOGOUT} 
};

const clearLogoutTimer = () => {
    if (timer){
        clearTimeout(timer);
    }
}

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime)
    };
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({ token, userId, expirationDate: expirationDate.toISOString() }))
};