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


export const pages: Page[] = [
  { path: "/", component: PageHome },
  { path: "/page404", component: Page404 },
  { path: "/login", component: PageLogin },
  { path: "/signup", component: PageSignUp },
     { path: "/all-categories", component: AllCategoriesPage },
    {path : "/post/:id",component : PostPage}

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
