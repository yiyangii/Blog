import React from "react";
import SectionLargeSlider from "app/(home)/SectionLargeSlider";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import {
  DEMO_POSTS,
  DEMO_POSTS_AUDIO,
  DEMO_POSTS_GALLERY,
  DEMO_POSTS_VIDEO,
} from "data/posts";
import { DEMO_CATEGORIES } from "data/taxonomies";
import { DEMO_AUTHORS } from "data/authors";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSliderPosts from "components/Sections/SectionSliderPosts";
import SectionMagazine1 from "components/Sections/SectionMagazine1";
import SectionAds from "components/Sections/SectionAds";
import SectionMagazine7 from "components/Sections/SectionMagazine7";
import SectionGridPosts from "components/Sections/SectionGridPosts";
import SectionMagazine8 from "components/Sections/SectionMagazine8";
import SectionMagazine9 from "components/Sections/SectionMagazine9";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionVideos from "components/Sections/SectionVideos";
import SectionLatestPosts from "components/Sections/SectionLatestPosts";
import SectionMagazine2 from "components/Sections/SectionMagazine2";
import {PostAuthorType, PostDataType, TaxonomyType} from "../../data/types";
import user from '../3536227.jpg';
//
const MAGAZINE1_POSTS = DEMO_POSTS.filter((_, i) => i >= 8 && i < 16);
const MAGAZINE2_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7);
//
const taxonomyExample: TaxonomyType = {
  id: '1',
  name: 'Technology',
  href: '/category/technology',
  count: 120,
  thumbnail: 'https://example.com/technology_thumbnail.jpg',
  desc: 'All posts related to technology.',
  color: 'blue',
  taxonomy: 'category',
};

const category1: TaxonomyType = {
  id: '2',
  name: 'Science',
  href: '/category/science',
  count: 85,
  thumbnail: 'https://example.com/science_thumbnail.jpg',
  desc: 'All posts related to java.',
  color: 'green',
  taxonomy: 'category',
};

const category2: TaxonomyType = {
  id: '3',
  name: 'Travel',
  href: '/category/travel',
  count: 60,
  thumbnail: 'https://example.com/travel_thumbnail.jpg',
  desc: 'All posts related to gaming.',
  color: 'orange',
  taxonomy: 'category',
};

const category3: TaxonomyType = {
  id: '4',
  name: 'Food',
  href: '/category/food',
  count: 150,
  thumbnail: 'https://example.com/food_thumbnail.jpg',
  desc: 'All posts related to food and cuisine.',
  color: 'red',
  taxonomy: 'category',
};
const taxonomyList: TaxonomyType[] = [
  {
    id: '1',
    name: 'Technology',
    href: '/category/technology',
    count: 120,
    thumbnail: 'https://imageio.forbes.com/specials-images/imageserve/63fcb4c67df8cc9968dc82c2/Software-source-code--Programming-code--Programming-code-on-computer-screen-/960x0.jpg?height=474&width=711&fit=bounds',
    desc: 'All posts related to technology.',
    color: 'blue',
    taxonomy: 'category',
  },
  {
    id: '2',
    name: 'JAVA',
    href: '/category/java',
    count: 114115,
    thumbnail: 'https://i.ibb.co/CKjDM22/Java-1.png',
    desc: 'All posts related to javad.',
    color: 'green',
    taxonomy: 'category',
  },
  {
    id: '3',
    name: 'Gaming',
    href: '/category/travel',
    count: 60,
    thumbnail: 'https://i.ibb.co/161CKsf/Weixin-Image-20231001223016.jpg',
    desc: 'All posts related to travel and adventure.',
    color: 'orange',
    taxonomy: 'category',
  },
  {
    id: '4',
    name: 'Hardware',
    href: '/category/hardware',
    count: 150,
    thumbnail: 'https://mycomputernotes.com/wp-content/uploads/2019/01/computer_hardware.jpg',
    desc: 'All posts related to hardware.',
    color: 'red',
    taxonomy: 'category',
  },
  {
    id: '5',
    name: 'GHC',
    href: '/category/ghc',
    count: 150,
    thumbnail: 'https://images.squarespace-cdn.com/content/v1/5b4500f05b409b6b3d04225e/1534044096721-3AG3F2PJ9151ZSW5YHU0/be0c9bae1d21c886dc0452be56812091_anitab-ghc.png',
    desc: 'All posts related to GHC.',
    color: 'red',
    taxonomy: 'category',
  },
  {
    id: '6',
    name: 'FrontEnd',
    href: '/category/frontend',
    count: 150,
    thumbnail: 'https://d33wubrfki0l68.cloudfront.net/0c1f2b3a7db2b90f7c24915eb8b1223bbd80d3e5/d5c2a/static/b87971fa3d35839c9b909d9dffc76dc9/frontend.png',
    desc: 'All posts related to frontend.',
    color: 'red',
    taxonomy: 'category',
  },


];



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

const PageHome = () => {
  return (
    <div className="nc-PageHome relative">
      <div className="container relative">

        <SectionSliderNewCategories
            // className="py-16 lg:py-28"  // Uncomment if needed
            heading="Top trending Categories"
            subHeading=""
            categories={taxonomyList}
            categoryCardType="card1"
            viewAllLink="/all-categories"  // Add this
        />

        <SectionMagazine2
            className="py-16 lg:py-24"
            heading="Life styles 🎨 "
            posts={posts}
        />
        {/*<SectionMagazine7*/}
        {/*  className="py-16 lg:py-28"*/}
        {/*  posts={DEMO_POSTS_GALLERY.filter((_, i) => i < 6)}*/}
        {/*/>*/}



      </div>

      <SectionAds/>

    </div>
  );
};

export default PageHome;
