import React from 'react';
import { TaxonomyType } from "data/types";
import {Link} from "react-router-dom";

interface AllCategoriesPageProps {
    categories: TaxonomyType[];
}
const categories: TaxonomyType[] = [
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


const CategoryCard: React.FC<TaxonomyType> = ({ name, href, thumbnail, desc, color }) => {
    return (
        <Link to={href} className={`block relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out ${color}`}>
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
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">All Categories</h1>
            <div className="grid grid-cols-2 gap-8"> {/* 用grid布局展示为两列 */}
                {categories.map((category, index) => (
                    <CategoryCard key={index} {...category} />
                ))}
            </div>
        </div>
    );
};

export default AllCategoriesPage;
