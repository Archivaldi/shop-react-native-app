import {API_KEY, LOCAL_CONFIG} from "@env";

export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";

export const signup = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password, returnSecureToken: true})
            });

            if(!response.ok){
                const errResData = await response.json();
                const errId = errResData.error.message;
                throw new Error(errId);
            }

            const responseData = await response.json();

            await console.log('line 22 in auth action', responseData);

            dispatch({type: SIGNUP,
                token: responseData.idToken,
                userId: responseData.localId
            })

        } catch (err) {
            throw err;
        }
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password, returnSecureToken: true})
            });

            if(!response.ok){
                const errResData = await response.json();
                const errId = errResData.error.message;
                throw new Error(errId);
            }

            const responseData = await response.json();

            await console.log('line 51 in auth action', responseData);

            dispatch({type: SIGNIN,
                token: responseData.idToken,
                userId: responseData.localId
            })

        } catch (err) {
            throw err;
        }
    }
}