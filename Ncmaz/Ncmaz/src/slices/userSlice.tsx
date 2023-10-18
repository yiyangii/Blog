import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {PostAuthorType} from "../data/types";


export const fetchUserById = createAsyncThunk<PostAuthorType, number>(
    'user/fetchUserById',
    async (id: number) => {
        const response = await axios.get(`http://localhost:8085/api/users/${id}`);
        const data = response.data;
        const transformedUser: PostAuthorType = {
            id: data.id,
            username: data.username,
            avatar: data.avatar || "",
            bgImage: data.bgImage || "",
            email: data.email,
            count: data.count,
            bio: data.bio,
            role: data.userRoles.join(', '),
            href: "/user-profile/" + data.id
        };

        return transformedUser;
    }
);


interface UserState {
    users: Record<number, any>;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    users: {},
    status: 'idle',
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUserById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users[action.payload.id as number] = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    }
});

export default userSlice.reducer;
