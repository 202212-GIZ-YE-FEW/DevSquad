import React, { useMemo, useState } from "react";

import Pagination from "./Pagination";
import Eventcard from "../Eventcard";
// this number of recoded
let PageSize = 1;

const PaginationComponent = () => {
    const data = [
        {
            id: 999,
            eventImage: "/images/Rectangle2.png",
            eventDate: "FRI, JUL -7:00 PM GMT+3",
            eventTitle: "Title of the Event1",
            eventDetails:
                "Details about the event. Lorem ipsum dolor sit ametz consectetur adipiscing elit, sed do eiusmod tempor incididuntuyuuyii iyooyi Lorem ipsum dolor sit ame consectetur, adipisicing elit. Deleniti quos pariat nemo veritatis repudiandae error suscipit. Quas saepe vel cupiditate, ipsa adipisci excepturi animi magnam facere culpa aliquam asperiores!",
            eventAttendance: [],
        },
        {
            id: 1000,
            eventImage: "/images/Rectangle2.png",
            eventDate: "FRI, JUL -7:00 PM GMT+3",
            eventTitle: "Title of the Event2",
            eventDetails:
                "Details about the event. Lorem ipsum dolor sit ametz consectetur adipiscing elit, sed do eiusmod tempor incididuntuyuuyii iyooyi Lorem ipsum dolor sit ame consectetur, adipisicing elit. Deleniti quos pariat nemo veritatis repudiandae error suscipit. Quas saepe vel cupiditate, ipsa adipisci excepturi animi magnam facere culpa aliquam asperiores!",
            eventAttendance: [],
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
            <div className='flex flex-col'>
                {/* this is example replase it with events list */}

                {currentTableData.map((item, index) => {
                    return (
                        <>
                            <div className='md:order-1 order-2'>
                                <Eventcard
                                    key={index}
                                    eventImage={item.eventImage}
                                    eventDate={item.eventDate}
                                    eventDetails={item.eventDetails}
                                    eventTitle={item.eventTitle}
                                    eventAttendance={item.eventAttendance}
                                />
                            </div>
                        </>
                    );
                })}
                <div className='md:order-2 order-1 text-center md:text-start'>
                    <Pagination
                        currentPage={currentPage}
                        totalCount={data.length}
                        pageSize={PageSize}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </>
    );
};

export default PaginationComponent;
