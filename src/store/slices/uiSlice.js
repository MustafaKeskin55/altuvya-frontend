import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    turanMode: localStorage.getItem('turanMode') === 'true',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTuranMode: (state) => {
            state.turanMode = !state.turanMode;
            localStorage.setItem('turanMode', state.turanMode);
        },
        setTuranMode: (state, action) => {
            state.turanMode = action.payload;
            localStorage.setItem('turanMode', state.turanMode);
        },
    },
});

export const { toggleTuranMode, setTuranMode } = uiSlice.actions;
export default uiSlice.reducer;
