import React, { useEffect, useState } from "react";

import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionAds from "components/Sections/SectionAds";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../slices/categorySlice";
import { RootState, AppDispatch } from "../../store";
import { fetchAllPosts } from "../../slices/postSlice";
import { fetchUserById } from "../../slices/userSlice";
import SectionMagazine2 from "components/Sections/SectionMagazine2";
import { PostDataType } from "../../data/types";
import Card2 from "components/Card2/Card2";
import BackgroundSection from "../../components/BackgroundSection/BackgroundSection";
import SectionSliderNewAuthors from "../../components/SectionSliderNewAthors/SectionSliderNewAuthors";
import {DEMO_AUTHORS} from "../../data/authors";
import SectionMagazine7 from "../../components/Sections/SectionMagazine7";
import {DEMO_POSTS_GALLERY} from "../../data/posts";

const PageHome = () => {
    const dispatch = useDispatch<AppDispatch>();
    const taxonomyList = useSelector((state: RootState) => state.categories.categories);
    const categoryStatus = useSelector((state: RootState) => state.categories.status);

    const postsFromRedux = useSelector((state: RootState) => state.post.posts);
    const usersFromRedux = useSelector((state: RootState) => state.user.users);
    const [localPosts, setLocalPosts] = useState<PostDataType[]>([]);
    const postStatus = useSelector((state: RootState) => state.post.status);
    const currentUser = useSelector((state: RootState) => state.user.currentUser);

    console.log(currentUser);
    useEffect(() => {
        if (categoryStatus === 'idle') {
            dispatch(fetchCategories());
        }

        if (postStatus === 'idle') {
            dispatch(fetchAllPosts());
        }
    }, [categoryStatus, postStatus, dispatch]);

    useEffect(() => {
        if (postStatus === 'succeeded' && postsFromRedux.length > 0) {
            // Fetch missing users based on posts' authorId
            postsFromRedux.forEach(post => {
                if (!usersFromRedux[post.authorId]) {
                    dispatch(fetchUserById(post.authorId));
                }
            });
        }
    }, [postStatus, postsFromRedux, usersFromRedux, dispatch]);

    useEffect(() => {
        if (postStatus === 'succeeded' && postsFromRedux.length > 0) {
            const updatedPosts = postsFromRedux.map(post => {
                const relatedUser = usersFromRedux[post.authorId];
                if (relatedUser) {
                    return {
                        ...post,
                        author: {
                            id: relatedUser.id,
                            username: relatedUser.username,
                            avatar: relatedUser.avatar || "",
                            count: relatedUser.count,
                            bio: relatedUser.bio,
                            role: "aa",
                            href: `/user/${relatedUser.id}`
                        }
                    };
                }
                return post;
            });
            setLocalPosts(updatedPosts);
        }
    }, [postStatus, postsFromRedux, usersFromRedux]);
    return (

        <div className="nc-PageHome relative">
            <div className="container relative">
                <div className="relative py-16">
                    <SectionSliderNewAuthors
                        heading="Welcome our Newest Creator"
                        subHeading="Hello World!"
                        authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
                    />
                </div>
                <SectionMagazine7
                    className="py-16 lg:py-28"
                    posts={localPosts.filter((_, i) => i < 6)}
                />
                <div className="mb-8">
                    <SectionSliderNewCategories
                        heading="Top trending Categories"
                        subHeading=""
                        categories={taxonomyList}
                        categoryCardType="card1"
                        viewAllLink="/all-categories"
                    />
                </div>

                {/* Use Card2 directly here */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {localPosts.map((post, index) => (
                        <Card2 key={index} size="normal" post={post} />

                    ))}
                </div>

                <SectionAds />

                <button
                    className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Refresh Posts
                </button>
            </div>
        </div>
    );
};

export default PageHome;
