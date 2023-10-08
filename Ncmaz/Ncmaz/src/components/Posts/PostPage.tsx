import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {PostAuthorType, PostDataType, TaxonomyType} from "../../data/types";
import PostCardMeta from "../PostCardMeta/PostCardMeta";
import PostCardLikeAndComment from "../PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardSaveAction from "../PostCardSaveAction/PostCardSaveAction"
import Image from "../Image";
const taxonomyExample: TaxonomyType = {
    id: '4',
    name: 'Food',
    href: '/category/food',
    count: 150,
    thumbnail: 'https://example.com/food_thumbnail.jpg',
    desc: 'All posts related to food and cuisine.',
    color: 'red',
    taxonomy: 'category',
};
const authorExample: PostAuthorType = {
    id: 1,
    firstName: 'Yi',
    lastName: 'Yang',
    displayName: 'John Wick',
    avatar: 'https://i.ibb.co/R7sVCxX/Weixin-Image-20231001223023.jpg',
    bgImage: '../user1.jpg',
    email: 'john.doe@example.com',
    count: 10,
    desc: 'A brief description about John Doe.',
    jobName: 'Software Developer',
    href: '/authors/1'
};
const posts: PostDataType[] = [
    {
        id: 1,
        author: authorExample,
        date: '2023-09-25 12:00:00Z',
        href: '/post/1',
        categories: [taxonomyExample],
        title: 'Post 1',
        featuredImage: 'https://i.ibb.co/FW3Mvf3/Weixin-Image-20231001223019.jpg',
        like: {
            count: 123,
            isLiked: false,
        },
        bookmark: {
            count: 456,
            isBookmarked: false,
        },
        commentCount: 999,
        viewdCount: 101112,
        readingTime: 5,
        postType: "standard",
    }
];

// const fetchPostById = async (id: any): Promise<PostDataType> => {
//     try {
//         const response = await fetch(`YOUR_API_ENDPOINT/posts/${id}`);
//
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//
//         const postData: PostDataType = await response.json();
//         return postData;
//     } catch (error) {
//         console.error("There was a problem with the fetch operation:", error);
//         throw error;
//     }
// };
const fetchPostById = async (id: any): Promise<PostDataType> => {
    // 模拟一个网络请求的延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    const postData = posts.find(post => post.id.toString() === id);

    if (!postData) {
        throw new Error("Post not found");
    }

    return postData;
};

const PostPage: React.FC = () => {
    const { id } = useParams();
    const [post, setPost] = useState<PostDataType | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const postData = await fetchPostById(id);
            setPost(postData);
        };

        fetchData();
    }, [id]);

    if (!post) {
        return <div>Loading...</div>; // 或其他加载状态的显示方式
    }

    const size = "large";

    return (
        <div className="container relative">


        <div className="bg-white shadow-xl rounded-md overflow-hidden p-6">
            {/* Featured Image */}
            <Image src={post.featuredImage} alt={post.title} className="w-full h-56 object-cover mb-4"/>

            {/* Meta Data & Author Info */}
            <PostCardMeta
                className="relative text-sm mb-4"
                avatarSize="h-8 w-8 text-sm"
                meta={post}
            />

            {/* Post Title */}
            <h2
                className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 ${
                    size === "large" ? "text-base sm:text-lg md:text-xl" : "text-base"
                } mb-4`}
            >
                <span className="line-clamp-2" title={post.title}>
                    {post.title}
                </span>
            </h2>

            {/* Post Text */}
            <span className="block text-neutral-500 dark:text-neutral-400 text-[15px] leading-6 mb-4">
                This is a post for Testing
            </span>

            {/* Like, Comment, and Save Actions */}
            <div className="flex items-center justify-between">
                <PostCardLikeAndComment className="relative" />
                <PostCardSaveAction className="relative" readingTime={post.readingTime} />
            </div>
        </div>
        </div>


    );
};

export default PostPage;
