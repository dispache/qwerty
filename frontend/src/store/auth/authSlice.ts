import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type AuthState = {
    isAuthenticated: boolean;
    user: any;
};

type AuthResponse = {
    user: {
        id: number;
        email: string;
        login: string;
        password: string;
        firstName: string;
        lastName: string;
        birthDate: string;
        role: string;
    },
    accessToken: string;
};

const authUser = localStorage.getItem('authUser');

const initialState: AuthState = {
    isAuthenticated: authUser ? true : false,
    user: authUser ? JSON.parse(authUser) : null
};

export const setAuthUser = createAsyncThunk<AuthResponse, AuthResponse, any>('auth/setAuthUser', (payload) => payload);

export const resetAuthUser = createAsyncThunk<void,void,any>('auth/resetAuthUser', (_) => {});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(setAuthUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('authUser', JSON.stringify(action.payload.user));
        });
        builder.addCase(resetAuthUser.fulfilled, (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('authUser');
        })
    },
});

export default authSlice.reducer;