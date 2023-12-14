import React from "react";
import { DEMO_CATEGORIES } from "data/taxonomies";
import { DEMO_POSTS, DEMO_POSTS_AUDIO } from "data/posts";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import { DEMO_AUTHORS } from "data/authors";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import Card16Podcast from "components/Card16Podcast/Card16Podcast";
import Card15Podcast from "components/Card15Podcast/Card15Podcast";
import Heading from "components/Heading/Heading";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionHero3 from "components/Sections/SectionHero3";
import SectionSliderPosts from "components/Sections/SectionSliderPosts";
import SectionAds from "components/Sections/SectionAds";
import SectionVideos from "components/Sections/SectionVideos";
import SectionLatestPosts from "components/Sections/SectionLatestPosts";
import SectionMagazine4 from "components/Sections/SectionMagazine4";


const POSTS = DEMO_POSTS;

const MAGAZINE1_POSTS = POSTS.filter((_, i) => i >= 0 && i < 8);
const MAGAZINE2_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7);


const PageHomeDemo2: React.FC = () => {
  return (
    <div className="nc-PageHomeDemo2 relative">
      <div className="container relative">
        <SectionHero3 className="pb-16 lg:pb-28" posts={MAGAZINE1_POSTS} />


        <SectionMagazine4
          className="py-16 lg:py-28"
          heading="Cook some new Project! 🎨 "
          posts={MAGAZINE2_POSTS}
        />


        <SectionVideos className="py-16 lg:py-28" />


      </div>
    </div>
  );
};

export default PageHomeDemo2;
