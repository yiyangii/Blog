import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterState {
    isLoading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: RegisterState = {
    isLoading: false,
    success: false,
    error: null
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerStart: (state) => {
            state.isLoading = true;
            state.success = false;
            state.error = null;
        },
        registerSuccess: (state) => {
            state.isLoading = false;
            state.success = true;
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
            state.success = false;
        }
    }
});

export const { registerStart, registerSuccess, registerFailure } = registerSlice.actions;
export default registerSlice.reducer;
