import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        //actions
        setAuthUser: (state, ACtion) => {
            state.user = ACtion.payload
        }
    }
})

export const {setAuthUser}=authSlice.actions;
export default authSlice.reducer;