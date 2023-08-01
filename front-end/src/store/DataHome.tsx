import { createSlice } from "@reduxjs/toolkit";

const DataHomeSlice = createSlice({
    name: 'DataHome',
    initialState: {
        page: "Overview",
        Location: true,
        Reward: true,
        Postmanager: true,
        Paymentrecord: true,

    },
    reducers: {
        setPage(state, action) {
            return {
                ...state,
                page: action.payload,
            }
        },
        getLocation(state) {
            return {
                ...state,
                Location: !state.Location
            }
        },
        getReward(state) {
            return {
                ...state,
                Reward: !state.Reward
            }
        },
        getPostmanager(state) {
            return {
                ...state,
                Postmanager: !state.Postmanager
            }
        },
        getPaymentrecord(state) {
            return {
                ...state,
                Paymentrecord: !state.Paymentrecord
            }
        }
    },
})

export const DataHomeActions = DataHomeSlice.actions;
export default DataHomeSlice.reducer;

