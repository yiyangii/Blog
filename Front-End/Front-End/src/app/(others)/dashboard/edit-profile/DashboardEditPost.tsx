import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Textarea from "components/Textarea/Textarea";
import Label from "components/Label/Label";
import Layout from "../../layout";
import LayoutDashboard from "../layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById } from "../../../../slices/postSlice";
import { AppDispatch, RootState } from "../../../../store";
import { TaxonomyType} from "../../../../data/types";
import CategoriesComponent from "../../../../component/CategoriesComponent";
import "../../../../styles/image-upload.css"

const DashboardEditPost = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const post = useSelector((state: RootState) => state.post.post);
    const postStatus = useSelector((state: RootState) => state.post.status);
    const [images, setImages] = useState<File[]>([]);


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileList = Array.from(event.target.files);
            setImages(prev => [...prev, ...fileList]);
        }
    };


    const renderUploadedImages = () => {
        return images.map((image, index) => (
            <div key={index} className="image-item">
                <img src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} width="100" height="100" />
                <button onClick={() => handleRemoveImage(index)}>删除</button>
            </div>
        ));
    };


    const handleRemoveImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };


    const pseudoCategories: TaxonomyType[] = [
        {
            id: 1,
            name: 'Tech',
            href: '/category/tech',
            taxonomy: 'category'
        },
        {
            id: 2,
            name: 'Travel',
            href: '/category/travel',
            taxonomy: 'category'
        },
        {
            id: 3,
            name: 'Food',
            href: '/category/food',
            taxonomy: 'category'
        },
        {
            id: 4,
            name: 'Lifestyle',
            href: '/category/lifestyle',
            taxonomy: 'category'
        }
    ];
    const pseudoTags: TaxonomyType[] = [
        {
            id: 1,
            name: 'React',
            href: '/category/lifestyle',
            taxonomy: 'tag'
        },
        {
            id: 2,
            name: 'Redux',
            href: '/category/lifestyle',
            taxonomy: 'category'
        },
    ];

    const [selectedTags, setSelectedTags] = useState<TaxonomyType[]>([]);

    const handleAddTag = (tagId: string | number| void) => {
        const tagToAdd = pseudoTags.find(tag => tag.id === tagId);
        if (tagToAdd && !selectedTags.some(tag => tag.id === tagToAdd.id)) {
            setSelectedTags(prev => [...prev, tagToAdd]);
        }
    };

    const handleRemoveTag = (tagId: string | number) => {
        setSelectedTags(prev => prev.filter(tag => tag.id !== tagId));
    };


    const [selectedCategories, setSelectedCategories] = useState(post ? post.categories : []);
    const [inputValue, setInputValue] = useState<string>('');
    const [categories, setCategories] = useState<TaxonomyType[]>(pseudoCategories);

    const handleAddCategory = (categoryId: string | number ) => {
        const categoryToAdd = pseudoCategories.find(cat => cat.id === categoryId);
        if (categoryToAdd && !selectedCategories.some(cat => cat.id === categoryToAdd.id)) {
            setSelectedCategories(prev => [...prev, categoryToAdd]);
        }
    };

    const handleRemoveCategory = (categoryId: string | number) => {
        setSelectedCategories(prev => prev.filter(cat => cat.id !== categoryId));
    };

    const handleRemoveCategoryFromComponent = (categoryId: string | number) => {
        handleRemoveCategory(categoryId);
    };

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
                            <Label>Post Description</Label>
                            <Textarea className="mt-1" rows={4} defaultValue={post.desc} />
                            <p className="mt-1 text-sm text-neutral-500">
                                Brief description for your article.
                            </p>
                        </label>

                        <label className="block">
                            <CategoriesComponent
                                categories={categories}
                                inputValue={inputValue}
                                onInputChange={setInputValue}
                                onAddCategory={() => handleAddCategory(inputValue)}
                                onRemoveCategory={handleRemoveCategoryFromComponent}
                            />
                        </label>


                        <label className="block">
                            <CategoriesComponent
                                categories={pseudoTags}
                                inputValue={inputValue}
                                onInputChange={setInputValue}
                                onAddCategory={() => handleAddCategory(inputValue)}
                                onRemoveCategory={handleRemoveCategoryFromComponent}
                            />
                        </label>

                        <div className="block md:col-span-2">
                            <Label>Featured Image</Label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <div className="flex flex-wrap gap-4 justify-center uploaded-images">
                                        {images.map((image, index) => (
                                            <div key={index} className="uploaded-image-item relative">
                                                <img src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} className="rounded shadow hover:shadow-md transition-shadow duration-300" width="100" height="100" />
                                                <button className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white rounded-full px-2 py-1 hover:bg-red-600 focus:outline-none focus:ring" onClick={() => handleRemoveImage(index)}>delete</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex flex-col sm:flex-row text-sm text-neutral-6000">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                onChange={handleImageChange}
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
