import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        token: '',
        test: 'test',
        selectedRegistry: {
            id: '',
            name: ''
        },
        userProfile: {
            first_name: '',
            last_name: '',
            email: '',
            profile_photo: ''
        }
    },
    reducers: {
        setAuthToken: (state, action) => {            
            state.token = action.payload            
        },

        setSelectedRegistry: (state, action) => {
            state.selectedRegistry.id = action.payload.id
            state.selectedRegistry.name = action.payload.name
        },

        setUserProfile: (state, action) => {              
            state.userProfile.first_name = action.payload.first_name
            state.userProfile.last_name = action.payload.last_name
            state.userProfile.email = action.payload.email
            state.userProfile.profile_photo = action.payload.profile_photo
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAuthToken, setSelectedRegistry, setUserProfile} = appSlice.actions

export default appSlice.reducer