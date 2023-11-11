import React from 'react';
import '../styles/CategoriesComponent.css'

interface TaxonomyType {
    id: string | number;
    name: string;
}

interface CategoriesComponentProps {
    categories: TaxonomyType[];
    inputValue: string;
    onInputChange: (value: string) => void;
    onAddCategory: () => void;
    onRemoveCategory: (id: string | number) => void;
}

const CategoriesComponent: React.FC<CategoriesComponentProps> = ({
                                                                     categories,
                                                                     inputValue,
                                                                     onInputChange,
                                                                     onAddCategory,
                                                                     onRemoveCategory
                                                                 }) => {
    const handleCategoryClick = () => {};

    return (
        <div className="categories-container">
            <div className="input-container">
                <input
                    className="category-input"
                    value={inputValue}
                    onChange={(e) => onInputChange(e.target.value)}
                    placeholder="Search for a category"
                />
                <button
                    className="px-6 py-3 font-medium rounded-full flex items-center hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                    onClick={onAddCategory}
                >
                    +
                </button>
            </div>

            <div className="categories-list">
                {categories.map(cat => (
                    <div
                        key={cat.id}
                        className="category-item px-6 py-3 font-medium rounded-full flex items-center hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                        onClick={handleCategoryClick}
                        role="button"
                        tabIndex={0}
                    >
                        {cat.name}
                        <button className="remove-btn" onClick={(e) => {
                            e.stopPropagation();
                            onRemoveCategory(cat.id);
                        }}>×</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesComponent;