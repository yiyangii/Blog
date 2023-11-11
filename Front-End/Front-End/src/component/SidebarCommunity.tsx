import React from "react";
import WidgetHeading1 from "components/WidgetHeading1/WidgetHeading1";
import {RootState} from "../store";
import {Community} from "../data/types";

export interface SidebarCommunityProps {
    className?: string;
    communities?: Community[];
}

const SidebarCommunity: React.FC<SidebarCommunityProps> = ({
                                                               className = "bg-neutral-100 dark:bg-neutral-800",
                                                               communities,
                                                           }) => {



    return (
        <div className={`nc-SidebarCommunity rounded-3xl overflow-hidden ${className}`}>
            <WidgetHeading1
                title="🔥 Top Trending Communities"
                viewAll={{ label: "View all", href: "/communities" }}
            />
            <div className="flow-root">
                <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">

                </div>
            </div>
        </div>
    );
};

export default SidebarCommunity;
