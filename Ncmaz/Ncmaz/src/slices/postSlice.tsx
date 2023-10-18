import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { PostDataType } from "../data/types";
import {scalarOptions} from "yaml";
import Str = scalarOptions.Str;

export const fetchPostById = createAsyncThunk<PostDataType, number>(
    'post/fetchPostById',
    async (id: number) => {
        const response = await axios.get(`http://localhost:8086/api/posts/${id}`);
        const data = response.data;
        const transformedPost: PostDataType = {
            id: data.id,
            author: {
                id: data.authorId,
                username: "",
                avatar: "",
                count: 0,
                bio: "",
                role: "",
                href: ""
            },
            authorId: data.authorId,
            date: data.createdAt,
            href: data.route,
            categories: [],
            title: data.title,
            featuredImage: data.featuredImage || "",
            commentCount: data.commentCount,
            viewdCount: data.viewdCount,
            readingTime: data.readingTime,
            galleryImgs: data.images.map((img: { url: String; }) => img.url),
            content: data.content

        };

        return transformedPost;
    }
);

interface PostState {
    post: PostDataType | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: PostState = {
    post: null,
    status: 'idle',
    error: null
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPostById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<PostDataType>) => {
                state.status = 'succeeded';
                state.post = action.payload;
            })
            .addCase(fetchPostById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "An error occurred.";
            });
    }
});

export default postSlice.reducer;
