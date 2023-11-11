import React, { useState } from "react";
import Layout from "../../layout";
import LayoutDashboard from "../layout";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";

export interface PostAuthorType {
  id: string | number;
  username: string;
  avatar: string;
  bgImage?: string;
  email?: string;
  count: number;
  bio: string;
  role: string;
  href: string;
  isFollowing?: boolean;
}

const sampleFollowing: PostAuthorType[] = [
  {
    id: 1,
    username: "A",
    avatar: "/path/to/alice-avatar.jpg",
    bgImage: "/path/to/alice-bg.jpg",
    count: 105,
    bio: "aaaaaaaaaaaaaaaaaa",
    role: "Travel Blogger",
    href: "/profile/alicewonders",
    isFollowing: true,
  },
  {
    id: 4,
    username: "B",
    avatar: "/path/to/alice-avatar.jpg",
    bgImage: "/path/to/alice-bg.jpg",
    count: 105,
    bio: "aaaaaaaaaaaaaaaaaa",
    role: "Travel Blogger",
    href: "/profile/alicewonders",
    isFollowing: true,
  },
  {
    id: 9,
    username: "C",
    avatar: "/path/to/alice-avatar.jpg",
    bgImage: "/path/to/alice-bg.jpg",
    count: 105,
    bio: "aaaaaaaaaaaaaaaaaa",
    role: "Travel Blogger",
    href: "/profile/alicewonders",
    isFollowing: true,
  },
  {
    id: 2,
    username: "D",
    avatar: "/path/to/bob-avatar.jpg",
    bgImage: "/path/to/bob-bg.jpg",
    count: 212,
    bio: "aaaaaaaaaaaaaaaaaa",
    role: "Craftsman",
    href: "/profile/bobbuilder",
    isFollowing: true,
  }
];

const sampleFollowers: PostAuthorType[] = [
  {
    id: 3,
    username: "aaaa",
    avatar: "/path/to/charlie-avatar.jpg",
    bgImage: "/path/to/charlie-bg.jpg",
    count: 320,
    bio: "aaaaaaaaaaaaaaaaaa",
    role: "Chef",
    href: "/profile/charliechoco",
    isFollowing: false,
  },
  {
    id: 4,
    username: "aaa",
    avatar: "/path/to/david-avatar.jpg",
    bgImage: "/path/to/david-bg.jpg",
    count: 140,
    bio: "aaaaaaaaaaaaaaaaaa",
    role: "Astronomer",
    href: "/profile/daviddreamer",
    isFollowing: true,
  }
];

const UserDashboard = () => {
  const [following, setFollowing] = useState<PostAuthorType[]>(sampleFollowing);
  const [followers, setFollowers] = useState<PostAuthorType[]>(sampleFollowers);
  const [showFollowers, setShowFollowers] = useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  console.log(currentUser);
  const toggleFollow = (id: string | number) => {
    if (showFollowers) {
      setFollowers(prevState => prevState.map(user =>
          user.id === id ? { ...user, isFollowing: !user.isFollowing } : user));
    } else {
      setFollowing(prevState => prevState.map(user =>
          user.id === id ? { ...user, isFollowing: !user.isFollowing } : user));
    }
  };
  function getButtonStyles(isActive: any) {
    return `px-6 py-3 font-medium rounded-full flex items-center ${
        isActive ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100" : "hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
    }`;
  }
  return (
      <Layout>
        <LayoutDashboard>
          <section className="my-4">
            <div className="container mx-auto px-4 py-6">
              <header className="mb-6 flex justify-between items-center">
                <div style={{ display: 'flex', justifyContent: 'start', gap: '16px' }}>
                  <button
                      className={`mr-4 px-6 py-3 font-medium rounded-full flex items-center ${!showFollowers ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100" : "hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"}`}
                      onClick={() => setShowFollowers(false)}
                  >
                    Following
                  </button>
                  <button
                      className={`px-6 py-3 font-medium rounded-full flex items-center ${showFollowers ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100" : "hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"}`}
                      onClick={() => setShowFollowers(true)}
                  >
                    Followers
                  </button>
                </div>

              </header>

              <div className="bg-white p-4 rounded shadow-lg">
                {(showFollowers ? followers : following).map((user) => (
                    <div key={user.id} className="flex items-center justify-between py-4 border-b border-gray-200">
                      <div className="flex items-center">
                        <img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-full mr-4" />
                        <div>
                          <div className="text-sm font-medium text-gray-700">{user.username}</div>
                          <div className="text-xs text-gray-500">{user.bio}</div>
                        </div>
                      </div>

                      <button
                          className={getButtonStyles(user.isFollowing)}
                          onClick={() => toggleFollow(user.id)}
                      >
                        {user.isFollowing ? 'Unfollow' : 'Follow'}
                      </button>

                    </div>
                ))}
              </div>
            </div>
          </section>
        </LayoutDashboard>
      </Layout>
  );
};

export default UserDashboard;