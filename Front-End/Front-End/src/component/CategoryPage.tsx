import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchAllPostIdsByCategory, fetchPostsByMultipleIds } from "../slices/postSlice";
import Card2 from "../components/Card2/Card2";
import { PostDataType } from "../data/types";
import styled from 'styled-components';

const Loading = styled.div`
    text-align: center;
    font-size: 20px;
    margin-top: 50px;
`;

const Container = styled.div`
    padding: 20px;
`;
const CategoryPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const [categoryPosts, setCategoryPosts] = useState<PostDataType[]>([]);

    const postIdsByCategory = useSelector((state: RootState) => state.post.postIdsByCategory);
    const status = useSelector((state: RootState) => state.post.status);
    const error = useSelector((state: RootState) => state.post.error);

    useEffect(() => {
        const categoryId = Number(id);
        if (!isNaN(categoryId)) {
            dispatch(fetchAllPostIdsByCategory(categoryId));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (postIdsByCategory.length > 0) {
            dispatch(fetchPostsByMultipleIds(postIdsByCategory))
                .then((action) => {
                    if (fetchPostsByMultipleIds.fulfilled.match(action)) {
                        setCategoryPosts(action.payload);
                    }
                });
        }
    }, [dispatch, postIdsByCategory]);

    if (status === 'loading') {
        return <div className="category-loading">Loading posts...</div>;
    }

    if (error) {
        return <div className="category-error">Error loading posts: {error}</div>;
    }

    return (
        <Container>

        <div className="category-page-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryPosts.map((post, index) => (
                    <Card2 key={index} size="normal" post={post} />
                ))}
            </div>
        </div>
        </Container>
    );
};

export default CategoryPage;
