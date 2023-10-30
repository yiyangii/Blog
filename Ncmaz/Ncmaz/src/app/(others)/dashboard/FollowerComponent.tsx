import React, { useState } from 'react';

import LayoutDashboard from "../layout";
import Layout from "./layout";


const data = [
    { id: '1', username: '用户A' },
    { id: '2', username: '用户B' },
    { id: '3', username: '用户C' },
    { id: '4', username: '用户D' },
];

const FollowerComponent: React.FC = () => {
    const [followers, setFollowers] = useState(data.slice(0, 2));
    const [following, setFollowing] = useState(data.slice(2));

    const handleUnfollow = (userId: string) => {
        setFollowing(prev => prev.filter(user => user.id !== userId));
        setFollowers(prev => [...prev, data.find(user => user.id === userId)!]);
    }

    const handleFollow = (userId: string) => {
        setFollowers(prev => prev.filter(user => user.id !== userId));
        setFollowing(prev => [...prev, data.find(user => user.id === userId)!]);
    }

    return (
        <Layout>
            <LayoutDashboard>
                <div className="bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-neutral-900 dark:text-neutral-200">
                            关注信息
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-neutral-500 dark:text-neutral-400">
                            您的关注详情
                        </p>
                    </div>
                    <div className="border-t border-neutral-200 dark:border-neutral-900">
                        <dl>
                            {following.map((user, index) => (
                                <div
                                    key={user.id}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-neutral-50 dark:bg-neutral-800"
                                            : "bg-white dark:bg-neutral-900"
                                    } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                                >
                                    <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-300">
                                        {user.username}
                                    </dt>
                                    <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2">
                                        <button onClick={() => handleUnfollow(user.id)}>取消关注</button>
                                    </dd>
                                </div>
                            ))}
                            {followers.map((user, index) => (
                                <div
                                    key={user.id}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-neutral-50 dark:bg-neutral-800"
                                            : "bg-white dark:bg-neutral-900"
                                    } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                                >
                                    <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-300">
                                        {user.username}
                                    </dt>
                                    <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2">
                                        <button onClick={() => handleFollow(user.id)}>关注</button>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </LayoutDashboard>
        </Layout>

    );
}

export default FollowerComponent;
