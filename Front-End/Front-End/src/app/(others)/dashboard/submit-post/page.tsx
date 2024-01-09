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
import { useNavigate } from "react-router-dom";

const DashboardSubmitPost = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [userAddedCategories, setUserAddedCategories] = useState<string[]>([]);
  const [userAddedTags, setUserAddedTags] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const history= useNavigate();


  interface FormDataType {
    title: string;
    excerpt: string;
    category: string[];
    tags: string[];
    content: string;
    authorId: number | string | undefined;
    featuredImages: File[]; // This is the new property for the image file
  }
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    excerpt: "",
    category: [],
    tags: [],
    content: "",
    authorId: currentUser?.id,
    featuredImages: [],
  });





  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };


  const handleAddCategory = async () => {
    const newCategoryText = newCategory.trim();
    if (newCategoryText !== "" && !userAddedCategories.includes(newCategoryText)) {
      setUserAddedCategories([...userAddedCategories, newCategoryText]);
      const categoryId = await fetchCategoryId(newCategoryText);
      if (categoryId) {
        setFormData({ ...formData, category: [...formData.category, categoryId] });
        console.log(`Category "${newCategoryText}" has been added with ID: ${categoryId}`);
      } else {
        console.error("Failed to fetch or create category");
      }
      setNewCategory('');
    }
  };


  const handleAddTag = async () => {
    const newTagText = newTag.trim();
    if (newTagText !== "" && !userAddedTags.includes(newTagText)) {
      setUserAddedTags([...userAddedTags, newTagText]);
      setFormData({ ...formData, tags: [...formData.tags, newTagText] });
      const tagId = await fetchTagId(newTagText);
      console.log(`Tag "${newTagText}" has been added with ID: ${tagId}`);
      setNewTag('');
    }
  };
  const convertFormDataToApiFormat = (formData: { tags: any; title: any; excerpt?: string; category: any; content: any; authorId?: string | number | undefined; featuredImages: any; }) => {
    const apiData = {
      title: formData.title,
      content: formData.content,
      authorId: currentUser?.id,
      visibility: "public", // Assuming the default is public
      postCategories: formData.category.map((categoryId: any) => ({
        category: {
          id: categoryId
        }
      })),
      images: formData.featuredImages.map((image: { url: any; altText: any; }) => ({
        url: image.url || "default_url.jpg",
        altText: image.altText || "Image description"
      })),
      postTags: formData.tags.map((tagId: any) => ({
        tag: {
          id: tagId
        }
      }))
    };

    return apiData;
  };


  const fetchCategoryId = async (categoryName: string) => {
    console.log('Fetching category ID for:', categoryName);
    try {
      const response = await fetch('http://localhost:8086/api/posts/getOrCreateCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }), // The server expects an object with a "name" property
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched category ID:', data);
      return data; // Ensure that this returns the ID or the object containing the ID as needed
    } catch (error) {
      console.error('Error fetching category ID:', error);
      return null;
    }
  };


  const fetchTagId = async (tagName: string) => {
    console.log('Fetching tag ID for:', tagName);
    try {
      const response = await fetch('http://localhost:8086/api/posts/getOrCreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: tagName ,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched tag ID:', data);
      return data;
    } catch (error) {
      console.error('Error fetching tag ID:', error);
      return null;
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const tagIds = await Promise.all(
          userAddedTags.map(tagName => fetchTagId(tagName))
      );

      const validTagIds = tagIds.filter(id => id !== null);

      if (validTagIds.length !== userAddedTags.length) {
        console.error("Some tags couldn't be processed");
        return;
      }


      const updatedFormData = {
        ...formData,
        tags: validTagIds
      };


      const postData = convertFormDataToApiFormat(updatedFormData);
      console.log(postData);


      const response = await fetch("http://localhost:8086/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const newPost = await response.json(); // Assuming the response contains the new post data
        const newPostId = newPost.id; // Replace with actual property name containing the ID
        history(`/post/${newPostId}`); // Redirect to the PostPage
      } else {
        console.error("Failed to submit post");
      }
    } catch (error) {
      console.error("Error submitting post:", error);

    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const filePreviews = filesArray.map(file => URL.createObjectURL(file));

      setImageFiles(prevFiles => [...prevFiles, ...filesArray]);
      setImagePreviews(prevPreviews => [...prevPreviews, ...filePreviews]);
      setFormData(prevFormData => ({
        ...prevFormData,
        featuredImages: [...prevFormData.featuredImages, ...filesArray],
      }));
    }
  };
  const handleRemoveImage = (index: number) => {
    setImageFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
    setFormData(prevFormData => ({
      ...prevFormData,
      featuredImages: prevFormData.featuredImages.filter((_, i) => i !== index),
    }));
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

                <div className="mt-2 flex">
                  <Input
                      type="text"
                      className="mt-1"
                      placeholder="Add new category"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <ButtonPrimary type="button" className="ml-2" onClick={handleAddCategory}>
                    Add
                  </ButtonPrimary>
                </div>
                {/* Display user-added categories */}
                {userAddedCategories.length > 0 && (
                    <div className="mt-2">
                      <Label>Your Categories:</Label>
                      <ul>
                        {userAddedCategories.map((category, index) => (
                            <li key={index}>{category}</li>
                        ))}
                      </ul>
                    </div>
                )}
              </label>
              <label className="block">
                <Label>Tags</Label>
                <div className="mt-2 flex">
                  <Input
                      type="text"
                      className="mt-1"
                      placeholder="Add new tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                  />
                  <ButtonPrimary type="button" className="ml-2" onClick={handleAddTag}>
                    Add
                  </ButtonPrimary>

                </div>
                {userAddedTags.length > 0 && (
                    <div className="mt-2">
                      <Label>Your Tags:</Label>
                      <ul>
                        {userAddedTags.map((tag, index) => (
                            <li key={index}>{tag}</li>
                        ))}
                      </ul>
                    </div>
                )}
              </label>
              <div className="block md:col-span-2">
                <Label>Featured Image</Label>
                <div className="mt-1 flex flex-wrap justify-center gap-2 border-2 border-dashed border-neutral-300 p-2 rounded-md">
                  {imagePreviews.map((src, index) => (
                      <div key={index} className="relative">
                        <img src={src} alt={`Preview ${index}`} className="h-24 w-24 object-cover rounded-md" />
                        <button type="button" className="absolute top-0 right-0 bg-white rounded-full p-1" onClick={() => handleRemoveImage(index)}>
                          <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                  ))}
                  <label htmlFor="file-upload" className="flex items-center justify-center h-24 w-24 border-2 border-neutral-300 border-dashed rounded-md cursor-pointer">
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} multiple />
                    <svg className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {/* SVG path for upload icon */}
                    </svg>
                  </label>
                </div>

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
