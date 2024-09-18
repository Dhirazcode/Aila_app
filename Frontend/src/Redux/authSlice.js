import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        suggestedUsers: []
    },
    reducers: {
        // Actions
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        setSelectedUsers: (state, action) => {
            state.suggestedUsers = action.payload;
        }
    }
});

export const { setAuthUser,  setSelectedUsers } = authSlice.actions;
export default authSlice.reducer;
