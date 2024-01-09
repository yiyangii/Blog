import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page } from "./types";

import PageHome from "app/(home)/page";

import Page404 from "app/not-found";
import PageLogin from "app/(others)/login/page";
import PageSignUp from "app/(others)/signup/page";

import SiteHeader from "app/SiteHeader";
import AllCategoriesPage from "../components/Categories/AllCategoriesPage";
import PostPage from "../components/Posts/PostPage";
import { Provider } from 'react-redux';
import store from "../store";
import DashboardEditProfile from "../app/(others)/dashboard/edit-profile/page";
import DashboardSubmitPost from "../app/(others)/dashboard/submit-post/page";
import DashboardPosts from "../app/(others)/dashboard/posts/page";
import DashboardSubcription from "../app/(others)/dashboard/subscription/page";
import FollowerComponent from "../app/(others)/dashboard/FollowerComponent";
import UserDashboard from "../app/(others)/dashboard/subscription/page";
import DashboardEditPost from "../app/(others)/dashboard/edit-profile/DashboardEditPost";
import PageHomeDemo6 from "../app/(home)/home-6/page";
import CommunityComponent from "../app/(home)/home-3/page";
import ViewAllCommunities from "../component/ViewAllCommunities";
import PageHomeDemo2 from "../app/(home)/home-2/page";
import CategoryPage from "../component/CategoryPage";


export const pages: Page[] = [
    { path: "/", component: PageHome },
    { path: "/page404", component: Page404 },
    { path: "/login", component: PageLogin },
    { path: "/signup", component: PageSignUp },
    { path: "/all-categories", component: AllCategoriesPage },
    { path : "/post/:id",component : PostPage},
    { path: "/user/:id", component: DashboardEditProfile},
    { path: "/dashboard/submit-post",component : DashboardSubmitPost},
    { path: "/dashboard/posts",component : DashboardPosts},
    { path: "/dashboard/follower",component:UserDashboard},
    { path: "/post-edit/:id",component:DashboardEditPost},
    { path: "/Blog-Community/community",component:CommunityComponent},
    {path: "//view-all-communities",component:ViewAllCommunities},
    {path : "/Blog-Post/post",component:PageHomeDemo2},
    { path: "/category/:id", component: CategoryPage }




];
const MyRoutes = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <SiteHeader />

                <Routes>
                    {pages.map(({ component: Component, path }, index) => {
                        return <Route key={index} element={<Component />} path={path} />;
                    })}
                    <Route path="*" element={<Page404 />} />  // Catch-all route should be specified like this in v6.
                </Routes>

            </BrowserRouter>
        </Provider>
    );
};


export default MyRoutes;
