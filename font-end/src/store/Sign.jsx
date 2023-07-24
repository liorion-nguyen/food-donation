import { createSlice } from "@reduxjs/toolkit";

const checkLocalStorage = () => {
    const checkLogin = localStorage.getItem('checkLogin');
    if (checkLogin) {
        return JSON.parse(checkLogin);
    } else {
        return false;
    }
};

const SignSlice = createSlice({
    name: 'Sign',
    initialState: {
        check: checkLocalStorage(),
    },
    reducers: {
        LoginSucces(state) {
            return {
                ...state,
                check: true,
            }
        },
        LogoutSucces(state) {
            return {
                ...state,
                check: false,
            }
        }
    }
})

export const SignActions = SignSlice.actions;
export default SignSlice.reducer;