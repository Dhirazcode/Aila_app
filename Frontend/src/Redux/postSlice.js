import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
    },
    reducers: {
        // Action to set posts in the state
        setPosts: (state, action) => {
            state.posts = action.payload;
        }
    }
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;