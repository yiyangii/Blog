import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NcImage from "components/NcImage/NcImage";
import Layout from "../../layout";
import LayoutDashboard from "../layout";
import PaginationComponent from "../../../../utils/PaginationComponent";
import { AppDispatch, RootState } from "../../../../store";
import { fetchAllPostsByAuthor } from "../../../../slices/postSlice";
import {Link} from "react-router-dom";

const DashboardPosts = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const authorId = currentUser ? currentUser.id : null;
  const dispatch: AppDispatch = useDispatch();
  const postsByAuthor = useSelector((state: RootState) => state.post.postsByAuthor);
  const [displayedItems, setDisplayedItems] = useState(postsByAuthor.slice(0, itemsPerPage));

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedItems(postsByAuthor.slice(startIndex, endIndex));
  };

  useEffect(() => {
    const numericAuthorId = authorId !== null ? Number(authorId) : null;
    if (numericAuthorId !== null && !isNaN(numericAuthorId)) {
      dispatch(fetchAllPostsByAuthor(numericAuthorId));
    }
  }, [dispatch, authorId]);

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
                                  src={item.featuredImage}
                                  fill
                                  sizes="80px"
                                  alt="post"
                              />
                              <div className="ml-4 flex-grow">
                                <Link to={`/post/${item.id}`} className="inline-flex line-clamp-2 text-sm font-semibold dark:text-neutral-300">
                                  {item.title}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.commentCount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.like?.count}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                            <a
                                href={`/post-edit/${item.id}/`}
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
                totalItems={postsByAuthor.length}
                paginate={paginate}
            />
          </div>
        </LayoutDashboard>
      </Layout>
  );
};

export default DashboardPosts;
