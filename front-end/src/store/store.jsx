import { configureStore } from "@reduxjs/toolkit";
import alertReducer from './alert';
import dialogReducer from './DialogHome';
import datahomeReducer from './DataHome';
import signReducer from './Sign';
import loadingReducer from './loading';

const store = configureStore({
    reducer: {
        alert: alertReducer,
        dialog: dialogReducer,
        dataHome: datahomeReducer,
        sign: signReducer,
        loading: loadingReducer,
    }
})

export default store;