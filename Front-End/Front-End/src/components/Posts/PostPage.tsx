import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById } from '../../slices/postSlice';
import { AppDispatch, RootState } from "../../store";
import Image from "../Image";
import PostCardLikeAndComment from "../PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardSaveAction from "../PostCardSaveAction/PostCardSaveAction";
import PostCardMeta from "../PostCardMeta/PostCardMeta";
import { PostAuthorType, PostDataType } from "../../data/types";

const PostPage: React.FC = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const post = useSelector((state: RootState) => state.post.post);
    const usersFromRedux = useSelector((state: RootState) => state.user.users);

    const [localPost, setLocalPost] = useState<PostDataType | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (id) {
            dispatch(fetchPostById(Number(id)));
        }
    }, [id, dispatch]);
    useEffect(() => {
        if (post) {
            setLocalPost(post);
        }
    }, [post]);
    useEffect(() => {
        if (post) {
            const relatedUser = usersFromRedux[post.authorId];
            if (relatedUser) {
                const updatedPost = {
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
                setLocalPost(updatedPost);
            }else {
                setLocalPost(post); // set post even if related user is not found
            }
        }
    }, [post, usersFromRedux]);

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => prevIndex === 0 ? (localPost?.galleryImgs?.length || 0) - 1 : prevIndex - 1);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (localPost?.galleryImgs?.length || 0));
    };

    console.log("local"  + localPost);
    if (!localPost) {
        return <div>Loading...</div>;
    }

    const currentImage = localPost.galleryImgs?.[currentImageIndex] || 'default_image_url.jpg';

    return (
        <div className="container relative">
            <div className="bg-white shadow-xl rounded-md overflow-hidden p-6">
                <div className="flex justify-between items-center">
                    <PostCardMeta
                        className="relative text-sm"
                        avatarSize="h-8 w-8 text-sm"
                        meta={localPost}
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                        Follow
                    </button>
                </div>
                <div className="mt-4 relative">
                    <Image src={currentImage} alt="Post image" className="w-full h-96 object-cover" />

                    <button onClick={handlePreviousImage} className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-black bg-opacity-50 text-white">
                        &lt;
                    </button>

                    <button onClick={handleNextImage} className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-black bg-opacity-50 text-white">
                        &gt;
                    </button>
                </div>

                <h2 className="mt-4 text-base sm:text-lg md:text-xl mb-4">
                    <span className="line-clamp-2" title={localPost.title}>
                        {localPost.title}
                    </span>
                </h2>

                <span className="block text-neutral-500 text-[15px] leading-6 mb-4">
                    {localPost.content}
                </span>

                <div className="flex items-center justify-between mt-4">
                    <PostCardLikeAndComment className="relative" />
                    <PostCardSaveAction className="relative" readingTime={localPost.readingTime} />
                </div>
            </div>
        </div>
    );
};

export default PostPage;
