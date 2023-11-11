import React from 'react';
import {Route} from "workbox-routing";
import {TaxonomyType} from "../data/types";

interface TagType {
    id: string | number;
    name: string;
    href: Route;
    taxonomy: "category" | "tag";
}

interface TagsComponentProps {
    tags: TaxonomyType[];
    inputValue: string;
    onInputChange: (value: string) => void;
    onAddTag: () => void;
    onRemoveTag: (id: string | number) => void;
}

const TagsComponent: React.FC<TagsComponentProps> = ({
                                                         tags,
                                                         inputValue,
                                                         onInputChange,
                                                         onAddTag,
                                                         onRemoveTag
                                                     }) => {
    return (
        <div className="categories-container">
        <div className="input-container">
        <input
            className="category-input"
    value={inputValue}
    onChange={(e) => onInputChange(e.target.value)}
    placeholder="Search for a tag"
    />
    <button
        className="px-6 py-3 font-medium rounded-full flex items-center hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
    onClick={onAddTag}
        >
        +
            </button>
        </div>

        <div className="categories-list">
        {tags.map(tag => (
                <div
                    key={tag.id}
            className="category-item px-6 py-3 font-medium rounded-full flex items-center hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
            role="button"
            tabIndex={0}
            >
            {tag.name}
            <button className="remove-btn" onClick={(e) => {
        e.stopPropagation();
        onRemoveTag(tag.id);
    }}>×</button>
    </div>
))}
    </div>
    </div>
);
}

export default TagsComponent;
