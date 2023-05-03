import classnames from "classnames";
import { useTranslation } from "next-i18next";
const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
    const { i18n } = useTranslation();
    const pagesCount = Math.ceil(items / pageSize); // 100/10

    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

    return (
        <>
            <p className='py-3 font-Rubik  font-bold'> Pages</p>
            <ul
                className={classnames(
                    "sm:mx-32 inline-flex max-w-xs justify-center items-center border border-black h-8"
                )}
            >
                {/* Left navigation arrow */}

                <li
                    onClick={() => onPageChange(currentPage - 1)}
                    className={`${
                        currentPage > 1
                            ? "m-1 h-8"
                            : "bg-gray-200 opacity-50 cursor-not-allowed m-1 h-8 pointer-events-none"
                    }`}
                >
                    {i18n.language === "en" ? (
                        <svg
                            width='34'
                            height='34'
                            viewBox='0 0 34 34'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fill-rule='evenodd'
                                clip-rule='evenodd'
                                d='M0.5 17C0.5 26.1127 7.8873 33.5 17 33.5C26.1127 33.5 33.5 26.1127 33.5 17C33.5 7.8873 26.1127 0.5 17 0.5C7.8873 0.5 0.5 7.8873 0.5 17ZM9.75871 16.4101L19.9922 8.24435C20.1578 8.0879 20.3825 8 20.6167 8C21.1045 8 21.5 8.37352 21.5 8.83427V25.1657C21.5 25.387 21.4069 25.5992 21.2413 25.7556C20.8964 26.0815 20.3371 26.0815 19.9922 25.7556L9.75871 17.5899C9.41376 17.2641 9.41376 16.7359 9.75871 16.4101Z'
                                fill='#1A1A1A'
                                fill-opacity='0.7'
                            />
                        </svg>
                    ) : (
                        <svg
                            width='34'
                            height='34'
                            viewBox='0 0 34 34'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fill-rule='evenodd'
                                clip-rule='evenodd'
                                d='M0.5 17C0.5 26.1127 7.8873 33.5 17 33.5C26.1127 33.5 33.5 26.1127 33.5 17C33.5 7.8873 26.1127 0.5 17 0.5C7.8873 0.5 0.5 7.8873 0.5 17ZM13.3833 8C13.6175 8 13.8422 8.0879 14.0078 8.24435L24.2413 16.4101C24.5862 16.7359 24.5862 17.2641 24.2413 17.5899L14.0078 25.7556C13.6629 26.0815 13.1036 26.0815 12.7587 25.7556C12.5931 25.5992 12.5 25.387 12.5 25.1657V8.83427C12.5 8.37352 12.8955 8 13.3833 8Z'
                                fill='#1A1A1A'
                                fill-opacity='0.7'
                            />
                        </svg>
                    )}
                </li>

                {pages.map((page) => (
                    <li
                        key={page}
                        className={`flex items-center p-3 text-center h-8 min-w-6 border-2 border-black m-1 rounded-lg ${
                            page === currentPage
                                ? "bg-primary-orange text-white"
                                : "bg-white text-black"
                        }`}
                        onClick={() => onPageChange(page)}
                    >
                        <a>{page}</a>
                    </li>
                ))}
                {/*  Right Navigation arrow */}

                <li
                    onClick={() => onPageChange(currentPage + 1)}
                    className={`${
                        currentPage < pagesCount
                            ? "m-1 h-8"
                            : "bg-gray-200 opacity-50 cursor-not-allowed m-1 h-8 pointer-events-none"
                    }`}
                >
                    {i18n.language === "en" ? (
                        <svg
                            width='34'
                            height='34'
                            viewBox='0 0 34 34'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fill-rule='evenodd'
                                clip-rule='evenodd'
                                d='M0.5 17C0.5 26.1127 7.8873 33.5 17 33.5C26.1127 33.5 33.5 26.1127 33.5 17C33.5 7.8873 26.1127 0.5 17 0.5C7.8873 0.5 0.5 7.8873 0.5 17ZM13.3833 8C13.6175 8 13.8422 8.0879 14.0078 8.24435L24.2413 16.4101C24.5862 16.7359 24.5862 17.2641 24.2413 17.5899L14.0078 25.7556C13.6629 26.0815 13.1036 26.0815 12.7587 25.7556C12.5931 25.5992 12.5 25.387 12.5 25.1657V8.83427C12.5 8.37352 12.8955 8 13.3833 8Z'
                                fill='#1A1A1A'
                                fill-opacity='0.7'
                            />
                        </svg>
                    ) : (
                        <svg
                            width='34'
                            height='34'
                            viewBox='0 0 34 34'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fill-rule='evenodd'
                                clip-rule='evenodd'
                                d='M0.5 17C0.5 26.1127 7.8873 33.5 17 33.5C26.1127 33.5 33.5 26.1127 33.5 17C33.5 7.8873 26.1127 0.5 17 0.5C7.8873 0.5 0.5 7.8873 0.5 17ZM9.75871 16.4101L19.9922 8.24435C20.1578 8.0879 20.3825 8 20.6167 8C21.1045 8 21.5 8.37352 21.5 8.83427V25.1657C21.5 25.387 21.4069 25.5992 21.2413 25.7556C20.8964 26.0815 20.3371 26.0815 19.9922 25.7556L9.75871 17.5899C9.41376 17.2641 9.41376 16.7359 9.75871 16.4101Z'
                                fill='#1A1A1A'
                                fill-opacity='0.7'
                            />
                        </svg>
                    )}
                </li>
            </ul>
        </>
    );
};

export default Pagination;
