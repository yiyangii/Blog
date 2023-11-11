import React from 'react';

interface PaginationProps {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
                                                            currentPage,
                                                            itemsPerPage,
                                                            totalItems,
                                                            paginate
                                                        }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-8">
            <ul className="flex justify-center space-x-4">
                {pageNumbers.map(number => (
                    <li key={number} className="text-center">
                        <a
                            onClick={() => paginate(number)}
                            href="#"
                            className={`
                                px-4 py-2 border-b-2 border-transparent
                                ${currentPage === number ? 'border-primary-500' : 'hover:border-primary-200 focus:border-primary-700'}
                            `}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default PaginationComponent;
