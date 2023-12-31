import { Route } from "routers/types";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: Route;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: Route;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";


}
export interface TagType {
  counts: number;
  id: number;
  tagName: string;
}

export interface Community {
  id: number;
  communityName: string;
  communityCreator: number;
  href: string;
  count: number;
  follow: number;
  desc: string;
}


export interface UserPostType {
  id: number;
  title: string;
  image: string;
  commentCount: number;
  likeCount: number;
};



export interface PostAuthorType {
  id: string | number;
  username: string;
  avatar: string;
  bgImage?: string;
  email?: string;
  count: number;
  bio: string;
  role: string;
  href: Route;
}

export interface PostDataType {

  id: string | number;
  author: PostAuthorType;
  authorId: number;
  date: string;
  href: Route;
  categories: TaxonomyType[];
  title: string;
  featuredImage: string;
  desc?: string;
  like?: {
    count: number;
    isLiked: boolean;
  };
  bookmark?: {
    count: number;
    isBookmarked: boolean;
  };
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType?: "standard" | "video" | "gallery" | "audio";
  videoUrl?: string;
  audioUrl?: string | string[];
  galleryImgs?: string[];
  content?:string;
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";
