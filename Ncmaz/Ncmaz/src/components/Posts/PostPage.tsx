import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById } from '../../slices/postSlice';
import { AppDispatch } from "../../store";
import Image from "../Image";
import PostCardLikeAndComment from "../PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardSaveAction from "../PostCardSaveAction/PostCardSaveAction";
import PostCardMeta from "../PostCardMeta/PostCardMeta";
import {PostAuthorType} from "../../data/types";

const PostPage: React.FC = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const post = useSelector((state: any) => state.post.post);
    const postStatus = useSelector((state: any) => state.post.status);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const fakeAuthor: PostAuthorType = {
        id: "123456789",
        username: "Hello World",
        avatar: "https://media.npr.org/assets/img/2021/10/14/paulsen-c.brian-adams---getty-images_custom-2a2b19cf93295cc479a55de473720fbf9814d48f-s1100-c50.jpg", // 更改为你的头像图片路径
        count: 42,
        bio: "",
        role: "作家",
        href: "/fake-author-path",
    };

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPostById(Number(id)));
        }
    }, [id, dispatch, postStatus]);

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => prevIndex === 0 ? post.images.length - 1 : prevIndex - 1);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % post.images.length);
    };

    if (!post || !post.images || post.images.length === 0) {
        return <div>Loading...</div>;
    }

    const currentImage = post.images[currentImageIndex];

    return (
        <div className="container relative">
            <div className="bg-white shadow-xl rounded-md overflow-hidden p-6">
                <div className="flex justify-between items-center">
                    <PostCardMeta
                        className="relative text-sm"
                        avatarSize="h-8 w-8 text-sm"
                        meta={{ author: fakeAuthor, date: post.date }}
                    />
                    {/* Follow Button */}
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                        Follow
                    </button>
                </div>
                {/* Add some space between the author and the image */}
                <div className="mt-4 relative">
                    <Image src={currentImage.url} alt={currentImage.altText} className="w-full h-96 object-cover" />

                    {/* Left Button */}
                    <button onClick={handlePreviousImage} className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-black bg-opacity-50 text-white">
                        &lt;
                    </button>

                    {/* Right Button */}
                    <button onClick={handleNextImage} className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-black bg-opacity-50 text-white">
                        &gt;
                    </button>
                </div>

                {/* Post Title */}
                <h2 className="mt-4 text-base sm:text-lg md:text-xl mb-4">
                    <span className="line-clamp-2" title={post.title}>
                        {post.title}
                    </span>
                </h2>

                {/* Post Text */}
                <span className="block text-neutral-500 text-[15px] leading-6 mb-4">
                    Permanent Placement
Should you or your client not have the time or resources to source for talent, we will gladly deliver. Mercury’s recruiting team has a vast network of talent pipelines through which we can find the perfect candidate for our clients.

Consulting Services
Mercury offers on-site IT consulting services through our seasoned veterans who can provide various specialized services, including troubleshooting and resolving IT issues on-site, software architecture, design and implementation, quality assurance, and much more.

IT Project Support
Should you have projects that need to be done but do not have the infrastructure to handle it, Mercury offers in-house project services that range from coding to full scale project management and delivery.

Contract Staffing
We have talented and experienced in-house consultants who are further trained by our top-tier trainers. Should our clients require temporary IT services, we are ready and able to deliver.

Software Design
Our in-house software development team will work with you to analyze your technical and business needs and requirements to ensure quality results. Mercury supports the entire lifecycle of software application design, from conception and coding, to application and quality assurance.
                </span>

                {/* Like, Comment, and Save Actions */}
                <div className="flex items-center justify-between mt-4">
                    <PostCardLikeAndComment className="relative" />
                    <PostCardSaveAction className="relative" readingTime={post.readingTime} />
                </div>
            </div>
        </div>
    );
};

export default PostPage;
