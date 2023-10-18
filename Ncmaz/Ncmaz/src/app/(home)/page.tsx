import React, {useEffect, useState} from "react";

import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionAds from "components/Sections/SectionAds";

import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../slices/categorySlice";
import {RootState,AppDispatch} from "../../store";
import {fetchPostById} from "../../slices/postSlice";
import {fetchUserById} from "../../slices/userSlice";
import SectionMagazine2 from "components/Sections/SectionMagazine2";
import {PostDataType} from "../../data/types";




const PageHome = () => {
    const dispatch = useDispatch<AppDispatch>();

    const taxonomyList = useSelector((state: RootState) => state.categories.categories);
    const categoryStatus = useSelector((state: RootState) => state.categories.status);

    const postIdToFetch = 174; // This can be replaced with any ID
    const postFromRedux = useSelector((state: RootState) => state.post.post);
    const [localPost, setLocalPost] = useState(postFromRedux);
    const postStatus = useSelector((state: RootState) => state.post.status);

    const user = useSelector((state: RootState) => state.user.users[postFromRedux?.authorId || -1]);
    const userStatus = useSelector((state: RootState) => state.user.status);

    useEffect(() => {
        if (categoryStatus === 'idle') {
            dispatch(fetchCategories());
        }

        if (postStatus === 'idle') {
            dispatch(fetchPostById(postIdToFetch));
        }
    }, [categoryStatus, postStatus, dispatch]);

    useEffect(() => {
        if (postStatus === 'succeeded' && postFromRedux && !user) {
            dispatch(fetchUserById(postFromRedux.authorId as number));
        }

        if (userStatus === 'succeeded' && postFromRedux && user) {
            const updatedPost = {
                ...postFromRedux,
                author: {
                    id: user.id,
                    username: user.username,
                    avatar: user.avatar || "",
                    count: user.count,
                    bio: user.bio,
                    role: "aa", // Check if userRoles exists
                    href: `/user/${user.id}` // Assuming each user has their own page
                }
            };
            setLocalPost(updatedPost);
        }
    }, [userStatus, postFromRedux, user, dispatch]);

    console.log(postFromRedux);






    return (
      <div className="nc-PageHome relative">
        <div className="container relative">

          <div className="mb-8">
            <SectionSliderNewCategories
                heading="Top trending Categories"
                subHeading=""
                categories={taxonomyList}
                categoryCardType="card1"
                viewAllLink="/all-categories"
            />
          </div>


          <div className="grid grid-cols-3 gap-4">
            <SectionMagazine2
                className="py-16 lg:py-24"
                heading="Posts"
                posts={[localPost  as PostDataType]}
            />
          </div>
          {/* Displaying the fetched post*/}
          {/*{postStatus === 'succeeded' && post && (*/}
          {/*    <div className="grid grid-cols-3 gap-4">*/}
          {/*      <SectionMagazine2*/}
          {/*          className="py-16 lg:py-24"*/}
          {/*          heading="Posts"*/}
          {/*          posts={[post]}*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*)}*/}
          {/*/!* ... rest of your component ... *!/*/}

          <SectionAds />
          <button
              className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              // onClick={fetchRandomPost}
          >
            Refresh Posts
          </button>
        </div>
      </div>
  );
};

export default PageHome;


