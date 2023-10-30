import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Select from "components/Select/Select";
import Textarea from "components/Textarea/Textarea";
import Label from "components/Label/Label";
import Layout from "../../layout";
import LayoutDashboard from "../layout";
import {useDispatch, useSelector} from "react-redux";
import {fetchPostById} from "../../../../slices/postSlice";
import {AppDispatch, RootState} from "../../../../store";

const DashboardEditPost = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const post = useSelector((state:RootState) => state.post.post);
    const postStatus = useSelector((state:RootState) => state.post.status);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPostById(Number(id)));
        }
    }, [id, postStatus, dispatch]);

    if (postStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (postStatus === 'failed' || !post) {
        return <div>Error loading the post.</div>;
    }

    return (
        <Layout>
            <LayoutDashboard>
                <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
                    <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
                        <label className="block md:col-span-2">
                            <Label>Post Title *</Label>
                            <Input type="text" className="mt-1" defaultValue={post.title} />
                        </label>

                        <label className="block md:col-span-2">
                            <Label>Post Excerpt</Label>
                            <Textarea className="mt-1" rows={4} defaultValue={post.desc} />
                            <p className="mt-1 text-sm text-neutral-500">
                                Brief description for your article. URLs are hyperlinked.
                            </p>
                        </label>

                        <label className="block">
                            <Label>Category</Label>
                            <label className="block">
                                <Label>Category</Label>
                                {/*<Input type="text" className="mt-1" value={post.categories} readOnly />*/}
                            </label>
                        </label>

                        <label className="block">
                            <Label>Tags</Label>
                            {/*<Input type="text" className="mt-1" defaultValue={post.tags} />*/}
                        </label>

                        <div className="block md:col-span-2">
                            <Label>Featured Image</Label>
                            {/* This section remains the same */}
                            {/* ... */}
                        </div>

                        <label className="block md:col-span-2">
                            <Label> Post Content</Label>
                            <Textarea className="mt-1" rows={16} defaultValue={post.content} />
                        </label>

                        <ButtonPrimary className="md:col-span-2" type="submit">
                            Update post
                        </ButtonPrimary>
                    </form>
                </div>
            </LayoutDashboard>
        </Layout>
    );
};

export default DashboardEditPost;
