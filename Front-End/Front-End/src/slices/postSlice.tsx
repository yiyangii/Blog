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
export const fetchPostsByMultipleIds = createAsyncThunk<PostDataType[], number[]>(
    'post/fetchPostsByMultipleIds',
    async (postIds, { dispatch }) => {
        // Create an array of promises, each fetching a post by its ID
        const promises = postIds.map(id =>
            dispatch(fetchPostById(id)).unwrap()
        );

        // Wait for all the promises to resolve
        const posts = await Promise.all(promises);

        // Return the array of fetched posts
        return posts;
    }
);



export const fetchAllPosts = createAsyncThunk<PostDataType[], void>(
    'post/fetchAllPosts',
    async () => {
        const response = await axios.get(`http://localhost:8086/api/posts`);
        const postsData = response.data;

        return postsData.map((data: any) => {
            return {
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
        });
    }
);
export const fetchAllPostsByAuthor = createAsyncThunk<PostDataType[], number>(
    'post/fetchAllPostsByAuthor',
    async (authorId: number) => {
        const response = await axios.get(`http://localhost:8086/api/posts/author/${authorId}`);
        const postsData = response.data;

        return postsData.map((data: any) => {
            return {
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
        });
    }
);

export const fetchAllPostIdsByCategory = createAsyncThunk<number[], number, { rejectValue: string }>(
    'post/fetchAllPostIdsByCategory',
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8086/api/posts/${categoryId}/postids`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as string);
            }
            throw error;
        }
    }
);
interface PostState {
    posts: PostDataType[];
    postsByAuthor: PostDataType[];
    postIdsByCategory: number[];
    post: PostDataType | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: PostState = {
    posts: [],
    postsByAuthor: [],
    postIdsByCategory: [],
    post: null,
    status: 'idle',
    error: null
};

// Slice for post
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsByMultipleIds.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPostsByMultipleIds.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Append new posts to the state
                action.payload.forEach(post => {
                    if (!state.posts.find(p => p.id === post.id)) {
                        state.posts.push(post);
                    }
                });
            })
            .addCase(fetchPostsByMultipleIds.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "An error occurred.";
            })
            .addCase(fetchPostById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.post = action.payload;
            })
            .addCase(fetchPostById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "An error occurred.";
            })
            .addCase(fetchAllPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "An error occurred.";
            })
            .addCase(fetchAllPostsByAuthor.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllPostsByAuthor.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.postsByAuthor = action.payload;
            })
            .addCase(fetchAllPostsByAuthor.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "An error occurred.";
            })
            // Assuming you have created and exported this async thunk
            .addCase(fetchAllPostIdsByCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllPostIdsByCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Make sure to have a corresponding array in your state to hold these IDs
                state.postIdsByCategory = action.payload;
            })
            .addCase(fetchAllPostIdsByCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "An error occurred.";
            });
    }
});



export default postSlice.reducer;
