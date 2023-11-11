import {PostDataType} from "../../data/types";

const PostCard: React.FC<{ post: PostDataType }> = ({ post }) => {
    return (
        <div className="border rounded-lg overflow-hidden bg-red-500 text-white relative shadow-md hover:shadow-lg transition-shadow duration-300">
            <img src={post.featuredImage} alt={post.title} className="w-full object-cover h-52 rounded-t-lg"/>
            <div className="p-5">
                <h3 className="font-bold mb-3 text-xl">{post.title}</h3>
                {post.desc && <p className="text-base mb-4">{post.desc}</p>}
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <span className="flex items-center text-sm">
                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="..."></path> {/* Heart icon SVG path */}
                            </svg>
                            {post.like?.count}
                        </span>
                        <span className="flex items-center text-sm">
                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="..."></path> {/* Comment icon SVG path */}
                            </svg>
                            {post.commentCount}
                        </span>
                    </div>
                    <div className="text-base font-medium">{post.author.username}</div>
                </div>
            </div>
            {post.date && (
                <div className="absolute top-2 right-2 p-2 bg-white bg-opacity-50 text-black text-xs rounded-full">
                    {post.date}
                </div>
            )}
        </div>
    );
}

export default PostCard;
