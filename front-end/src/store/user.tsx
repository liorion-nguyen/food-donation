import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: 
        {
            user: {},
            type: false,
        },
    reducers: {
        setUser(state, action) {
            return {
                ...state,
                user: action.payload,
            }
        },
        ChangeType(state) {
            return {
                ...state,
                type: !state.type,
            }
        }

    }
});
export const userActions = userSlice.actions;
export default userSlice.reducer;