import React, { useState } from "react";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Select from "components/Select/Select";
import Textarea from "components/Textarea/Textarea";
import Label from "components/Label/Label";
import Layout from "../../layout";
import LayoutDashboard from "../layout";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";

const DashboardSubmitPost = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "-1",
    tags: "",
    content: "",
    authorId: currentUser?.id
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch("http://localhost:8086/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Post submitted successfully");
      } else {
        console.error("Failed to submit post");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
      <Layout>
        <LayoutDashboard>
          <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
            <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit} method="post">
              <label className="block md:col-span-2">
                <Label>Post Title *</Label>
                <Input
                    type="text"
                    className="mt-1"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
              </label>
              <label className="block md:col-span-2">
                <Label>Post Excerpt</Label>
                <Textarea
                    className="mt-1"
                    rows={4}
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                />
                <p className="mt-1 text-sm text-neutral-500">
                  Brief description for your article. URLs are hyperlinked.
                </p>
              </label>
              <label className="block">
                <Label>Category</Label>
                <Select
                    className="mt-1"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                  <option value="-1">– select –</option>
                  <option value="category1">Category 1</option>
                  <option value="category2">Category 2</option>
                  <option value="category3">Category 3</option>
                </Select>
              </label>
              <label className="block">
                <Label>Tags</Label>
                <Input
                    type="text"
                    className="mt-1"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                />
              </label>
              {/* ... 其他部分保持不变 ... */}
              <div className="block md:col-span-2">
                <Label>Featured Image</Label>

                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-neutral-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                      <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                      ></path>
                    </svg>
                    <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
                      <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload a file</span>
                        <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-neutral-500">
                      PNG, JPG, GIF up to 2MB
                    </p>
                  </div>
                </div>
              </div>
              <label className="block md:col-span-2">
                <Label> Post Content</Label>

                <Textarea className="mt-1" rows={16} />
              </label>
              <label className="block md:col-span-2">
                <Label>Post Content</Label>
                <Textarea
                    className="mt-1"
                    rows={16}
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                />
              </label>
              <ButtonPrimary className="md:col-span-2" type="submit">
                Submit post
              </ButtonPrimary>
            </form>
          </div>
        </LayoutDashboard>
      </Layout>
  );
};

export default DashboardSubmitPost;
