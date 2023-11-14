import React, {FC, useEffect} from "react";
import Tag from "components/Tag/Tag";
import WidgetHeading1 from "components/WidgetHeading1/WidgetHeading1";
import { TaxonomyType } from "data/types";
import { DEMO_TAGS } from "data/taxonomies";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import { fetchAllTags } from "slices/TagSlice";

const tagsDemo = DEMO_TAGS.filter((_, i) => i < 9);

export interface WidgetTagsProps {
  className?: string;
  tags?: TaxonomyType[];
}

const WidgetTags: FC<WidgetTagsProps> = ({
                                             className = "bg-neutral-100 dark:bg-neutral-800",
                                         }) => {
    const dispatch : AppDispatch = useDispatch();
    const tags = useSelector((state: RootState) => state.tag.tags); // 'tag' 是在 Redux store 中的 slice 名称

    useEffect(() => {
        dispatch(fetchAllTags());
    }, [dispatch]);
    console.log(tags);
  return (
    <div className={`nc-WidgetTags rounded-3xl overflow-hidden ${className}`}>
      <WidgetHeading1
        title="💡 More tags"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flex flex-wrap p-4 xl:p-5">
        {tags.map((tag: TaxonomyType) => (
          <Tag className="mr-2 mb-2" key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
};

export default WidgetTags;
