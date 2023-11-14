import CardCategory1 from "components/CardCategory1/CardCategory1";
import WidgetHeading1 from "components/WidgetHeading1/WidgetHeading1";
import { DEMO_CATEGORIES } from "data/taxonomies";
import { TaxonomyType } from "data/types";
import React, {FC, useEffect} from "react";
import {AppDispatch, RootState} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllTags} from "../../slices/TagSlice";
import {fetchCategories} from "../../slices/categorySlice";

const categoriesDemo: TaxonomyType[] = DEMO_CATEGORIES.filter(
  (_, i) => i > 7 && i < 13
);
export interface WidgetCategoriesProps {
  className?: string;
  categories?: TaxonomyType[];
}

const WidgetCategories: FC<WidgetCategoriesProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
}) => {
  const dispatch : AppDispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <div
      className={`nc-WidgetCategories rounded-3xl  overflow-hidden ${className}`}
    >
      <WidgetHeading1
        title="✨ Trending topic"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flow-root">
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
          {categories.map((category) => (
            <CardCategory1
              className="p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              key={category.id}
              taxonomy={category}
              size="normal"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetCategories;
