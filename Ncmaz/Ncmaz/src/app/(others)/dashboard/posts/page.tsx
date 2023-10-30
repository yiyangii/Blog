import React from "react";
import NcImage from "components/NcImage/NcImage";
import Pagination from "components/Pagination/Pagination";
import Layout from "../../layout";
import LayoutDashboard from "../layout";
import PaginationComponent from "../../../../utils/PaginationComponent";

const people = [
  {
    id: 191,
    title: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    image: "https://images.unsplash.com/photo-1617059063772-34532796cdb5?...",
    commentCount: 23,
    likeCount: 45,
  },
  {
    id: 2,
    title: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    image: "https://images.unsplash.com/photo-1617059063772-34532796cdb5?...",
    commentCount: 23,
    likeCount: 45,
  },
  {
    id: 3,
    title: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    image: "https://images.unsplash.com/photo-1617059063772-34532796cdb5?...",
    commentCount: 23,
    likeCount: 45,
  },

  {
    id: 4,
    title: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    image: "https://images.unsplash.com/photo-1617059063772-34532796cdb5?...",
    commentCount: 23,
    likeCount: 45,
  },
  {
    id:5,
    title: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    image: "https://images.unsplash.com/photo-1617059063772-34532796cdb5?...",
    commentCount: 23,
    likeCount: 45,
  },
  {
    id: 6,
    title: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    image: "https://images.unsplash.com/photo-1617059063772-34532796cdb5?...",
    commentCount: 23,
    likeCount: 45,
  },
  {
    id: 7,
    title: "BBBBBBBBBBBBBBBBBBBBBBBBB",
    image: "https://images.unsplash.com/photo-1617059063772-34532796cdb5?...",
    commentCount: 23,
    likeCount: 45,
  },
];

const DashboardPosts = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [displayedItems, setDisplayedItems] = React.useState(people.slice(0, itemsPerPage));

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedItems(people.slice(startIndex, endIndex));
  };


  return (
      <Layout>
        <LayoutDashboard>
          <div className="flex flex-col space-y-8">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
                <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                    <thead className="bg-neutral-50 dark:bg-neutral-800">
                    <tr className="text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                      <th scope="col" className="px-6 py-3">Article</th>
                      <th scope="col" className="px-6 py-3">Comments</th>
                      <th scope="col" className="px-6 py-3">Likes</th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                    {displayedItems.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4">
                            <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                              <NcImage
                                  containerClassName="flex-shrink-0 h-12 w-12 rounded-lg relative z-0 overflow-hidden lg:h-14 lg:w-14"
                                  src={item.image}
                                  fill
                                  sizes="80px"
                                  alt="post"
                              />
                              <div className="ml-4 flex-grow">
                                <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                                  {item.title}
                                </h2>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.commentCount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.likeCount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                            <a
                                href={`/post-edit/${people[0].id}/`}
                                className="text-primary-800 dark:text-primary-500 hover:text-primary-900"
                            >
                              Edit
                            </a>
                            {` | `}
                            <a
                                href="/#"
                                className="text-rose-600 hover:text-rose-900"
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <PaginationComponent
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={people.length}
                paginate={paginate}
            />
          </div>
        </LayoutDashboard>
      </Layout>
  );
};

export default DashboardPosts;