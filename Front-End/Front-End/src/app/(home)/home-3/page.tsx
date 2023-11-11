import React from "react";
import { useSelector } from "react-redux";
import { DEMO_CATEGORIES } from "data/taxonomies";

import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionMagazine5 from "components/Sections/SectionMagazine5";
import SectionLatestPosts from "components/Sections/SectionLatestPosts";
import {RootState} from "../../../store";

const CommunityComponent: React.FC = () => {
  // Use useSelector to get the posts from the Redux store
  const posts = useSelector((state: RootState) => state.post.posts);

  // You can still filter the posts as needed for different sections
  const MAGAZINE1_POSTS = posts.filter((_, i) => i >= 0 && i < 8);
  const LATEST_POSTS = posts;
  console.log(MAGAZINE1_POSTS);

  return (
      <div className="nc-PageHomeDemo3 relative">
        <div className="container relative">
          {/*<SectionGridCategoryBox*/}
          {/*    headingCenter={false}*/}
          {/*    categoryCardType="card2"*/}
          {/*    className="pb-16 lg:pb-28"*/}
          {/*    categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}*/}
          {/*/>*/}
          <div className="relative py-16">
            <SectionMagazine5 heading="Top Post In Community " posts={MAGAZINE1_POSTS} />
          </div>
          <SectionLatestPosts
              posts={LATEST_POSTS}
              postCardName="card7"
              gridClass="sm:grid-cols-2"
              className="pb-16 lg:pb-28"
          />
        </div>
      </div>
  );
};

export default CommunityComponent;
