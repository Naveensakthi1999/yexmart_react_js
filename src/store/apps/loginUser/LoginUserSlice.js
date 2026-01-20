import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    user: null,
    user_type: null,
};

const LoginUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUserData: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state) => {
            state.user = null;
            state.user_type = null;
        },
        setUserAccountType: (state, action) => {
            state.user_type = action.payload;
        }
    }
});

export const {
    setIsLoading,
    setUserData,
    setLogout,
    setUserAccountType,
} = LoginUserSlice.actions;

export default LoginUserSlice.reducer;
