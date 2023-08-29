import { configureStore } from "@reduxjs/toolkit";
import alertReducer from './alert';
import dialogReducer from './DialogHome';
import datahomeReducer from './DataHome';
import signReducer from './Sign';
import loadingReducer from './loading';
import userReducer from './user';
import profileReducer from './profile';

const store = configureStore({
    reducer: {
        alert: alertReducer,
        dialog: dialogReducer,
        dataHome: datahomeReducer,
        sign: signReducer,
        loading: loadingReducer,
        user: userReducer,
        profile: profileReducer,
    }
})

export default store;