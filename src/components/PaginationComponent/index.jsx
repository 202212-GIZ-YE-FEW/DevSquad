import React, { useMemo, useState } from "react";

import Pagination from "./Pagination";
// this number of recoded
let PageSize = 1;

const PaginationComponent = () => {
    const data = [
        {
            id: 999,
            first_name: "Berke",
            last_name: "Lohmeyer",
            email: "blohmeyerrq@wunderground.com",
            phone: "754-548-5689",
        },
        {
            id: 1000,
            first_name: "Roderigo",
            last_name: "Jordeson",
            email: "rjordesonrr@nbcnews.com",
            phone: "596-412-7883",
        },
    ];

    const onPageChange = (page) => {
        setCurrentPage(page);
    };
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    return (
        <>
            {/* this is example replase it with events list */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FIRST NAME</th>
                        <th>LAST NAME</th>
                        <th>EMAIL</th>
                        <th>PHONE</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTableData.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalCount={data.length}
                pageSize={PageSize}
                onPageChange={onPageChange}
            />
        </>
    );
};

export default PaginationComponent;
