import { createSlice } from "@reduxjs/toolkit";

const DialogHomeSlice = createSlice({
    name: 'DialohHome',
    initialState: {
        open: false,
        succes: false,
        data: {
            page: '',
            mode: '',
        }
    },
    reducers: {
        showDialog(state, action) {
            return {
                ...state,
                open: true,
                data: action.payload,
            }
        },
        hideDialog(state) {
            return {
                ...state,
                open: false,
                data: {
                    page: '',
                    mode: '',
                },
                succes: false,
            }
        },
        handleAdd(state) {
            return {
                ...state,
                succes: true,
            }
        },
        handleRemoveAdd(state) {
            return {
                ...state,
                succes: false,
            }
        }

    }
})

export const DialogHomeActions = DialogHomeSlice.actions;
export default DialogHomeSlice.reducer;