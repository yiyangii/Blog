import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../store";
import { fetchAllCommunities } from "../slices/communitySlice";
import { Community } from '../data/types'; // Update this path to where your types are defined

type CommunityCardProps = {
    community: Community;
};
type RankingItem = {
    name: string;
    rank: number;
};

const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 m-2">
            <h3 className="text-xl font-bold mb-2">{community.communityName}</h3>
            <p className="text-gray-700 mb-4">{community.desc}</p>
            <p className="text-gray-700">Followers: {community.follow}</p>
            <p className="text-gray-700">Posts: {community.count}</p>
        </div>
    );
};

// A placeholder component for the sidebar ranking
const RankingSidebar = () => {
    // Placeholder communities ranking data
    const rankings: RankingItem[] = [
        { name: "JavaLover", rank: 1 },
        { name: "PythonRookie", rank: 2 },
        { name: "C++ Lover", rank: 3 },
        // ... other rankings
    ];

    return (
        <div className="w-64 bg-white p-4 shadow-md">
            <h3 className="font-bold text-lg mb-2">Rankings</h3>
            {rankings.map((item) => (
                <div key={item.rank} className="flex justify-between items-center mb-1">
                    <span className="text-sm">{item.name}</span>
                    <span className="text-sm font-bold">{item.rank}</span>
                </div>
            ))}
        </div>
    );
};

const ViewAllCommunities = () => {
    const dispatch: AppDispatch = useDispatch();
    const communities = useSelector((state: RootState) => state.community.communities);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [communitiesPerPage] = useState(7);

    useEffect(() => {
        dispatch(fetchAllCommunities());
    }, [dispatch]);

    // Get current communities for the page
    const indexOfLastCommunity = currentPage * communitiesPerPage;
    const indexOfFirstCommunity = indexOfLastCommunity - communitiesPerPage;
    const currentCommunities = communities.slice(indexOfFirstCommunity, indexOfLastCommunity);

    // Change page function
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Render loading state, or if communities are not yet loaded
    if (!communities.length) return <div className="text-center my-5">Loading communities...</div>;

    return (
        <div className="nc-PageHomeDemo3 relative">
            <div className="container relative">
                <div className="w-full lg:w-3/4 px-4 mb-6 lg:mb-0">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">All Communities</h2>
                    <div className="grid grid-cols-1 gap-6">
                        {currentCommunities.map((community) => (
                            <CommunityCard key={community.id} community={community} />
                        ))}
                    </div>
                    {/* Pagination component would go here */}
                </div>
                <aside className="w-full lg:w-1/4 px-4">
                    <div className="lg:sticky relative top-8">
                        <RankingSidebar />
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ViewAllCommunities;