import React, {useEffect} from 'react';
import { TaxonomyType } from "data/types";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../slices/categorySlice";
import {AppDispatch, RootState} from "../../store";



const CategoryCard: React.FC<TaxonomyType> = ({ id, name, thumbnail, desc, color }) => {
    return (
        <Link to={`/category/${id}`} className={`block relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out ${color}`}>
            <img src={thumbnail} alt={name} className="w-full h-52 object-cover transition-opacity duration-300 hover:opacity-70" />
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 hover:bg-opacity-50 flex items-center justify-center">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
                    <p className="text-white">{desc}</p>
                </div>
            </div>
        </Link>
    );
}

const AllCategoriesPage: React.FC<Object> = () => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories.categories);
    const status = useSelector((state: RootState) => state.categories.status);
    const error = useSelector((state: RootState) => state.categories.error);


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">All Categories</h1>
            <div className="grid grid-cols-2 gap-8">
                {categories.map((category, index) => (
                    <CategoryCard key={index} {...category} />
                ))}
            </div>
        </div>
    );
};

export default AllCategoriesPage;
