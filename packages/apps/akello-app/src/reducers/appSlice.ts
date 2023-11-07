import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        token: undefined,
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.token = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAuthToken } = appSlice.actions

export default appSlice.reducer