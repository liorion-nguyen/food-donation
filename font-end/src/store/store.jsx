import { configureStore } from "@reduxjs/toolkit";
import alertReducer from './alert';
import dialogReducer from './DialogHome';
import datahomeReducer from './DataHome';
import signReducer from './Sign';

const store = configureStore({
    reducer: {
        alert: alertReducer,
        dialog: dialogReducer,
        dataHome: datahomeReducer,
        sign: signReducer,
    }
})

export default store;