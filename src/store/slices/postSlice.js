import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    spotlightPosts: [],
    loading: false,
    error: null
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        setSpotlightPosts: (state, action) => {
            state.spotlightPosts = action.payload
        },
        addPost: (state, action) => {
            state.posts.unshift(action.payload)
        },
        updatePost: (state, action) => {
            const index = state.posts.findIndex(p => p.id === action.payload.id)
            if (index !== -1) {
                state.posts[index] = action.payload
            }
        }
    }
})

export const { setPosts, setSpotlightPosts, addPost, updatePost } = postSlice.actions
export default postSlice.reducer
