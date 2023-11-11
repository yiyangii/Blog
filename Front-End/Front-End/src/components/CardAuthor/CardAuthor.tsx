import React, { FC } from "react";
import { PostAuthorType } from "data/types";
import Avatar from "components/Avatar/Avatar";
import Link from "components/Link";

export interface CardAuthorProps {
  className?: string;
  author: PostAuthorType;
}

const CardAuthor: FC<CardAuthorProps> = ({ className = "", author }) => {
  const { username, href = "/", avatar, role } = author;
  return (
    <Link
      href={href}
      className={`nc-CardAuthor flex items-center ${className}`}
    >
      <Avatar
        sizeClass="h-10 w-10 text-base"
        containerClassName="flex-shrink-0 mr-4"
        radius="rounded-full"
        imgUrl={avatar}
        userName={username}
      />
      <div>
        <h2
          className={`text-sm sm:text-base text-neutral-900 dark:text-neutral-100 font-medium sm:font-semibold`}
        >
          {username}
        </h2>
        <span
          className={`block mt-[2px] text-xs text-neutral-500 dark:text-neutral-400`}
        >
          {role}
        </span>
      </div>
    </Link>
  );
};

export default CardAuthor;
