import React, { FC } from "react";
import Card2 from "components/Card2/Card2";
import { SectionMagazine1Props } from "./SectionMagazine1";
import HeaderFilter from "./HeaderFilter";
import Card11 from "components/Card11/Card11";

export interface SectionMagazine2Props extends SectionMagazine1Props {}


const SectionMagazine2: FC<SectionMagazine2Props> = ({
  posts,
  heading = "🎈 Latest Articles",
  className,
}) => {
  return (
    <div>
      {!posts.length && <span>Nothing we found!</span>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        <div className="lg:col-span-6">
          {posts[0] && <Card2 size="normal" post={posts[0]} />}
        </div>
      </div>
    </div>
  );
};

export default SectionMagazine2;
