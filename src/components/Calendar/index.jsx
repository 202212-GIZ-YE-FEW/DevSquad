import React from "react";
import { useState } from "react";

import CalendarComponent from "./CalendarComponent";

export default function Calendar() {
    const d = new Date();
    let month = d.getMonth();
    const [date, setDate] = useState(month);
    const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const months = [
        {
            id: 1,
            monthName: "January",
            days: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            ],
        },
        {
            id: 2,
            monthName: "February",
            days: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
            ],
        },
        {
            id: 3,
            monthName: "March",
            days: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
        },
        {
            id: 4,
            monthName: "April",
            days: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            ],
        },
        {
            id: 5,
            monthName: "May",
            days: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
        },
        {
            id: 6,
            monthName: "June",
            days: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            ],
        },
        {
            id: 7,
            monthName: "July",
            days: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
        },
        {
            id: 8,
            monthName: "August",
            days: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
        },
        {
            id: 9,
            monthName: "September",
            days: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            ],
        },
        {
            id: 10,
            monthName: "October",
            days: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
        },
        {
            id: 11,
            monthName: "November",
            days: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            ],
        },
        {
            id: 12,
            monthName: "December",
            days: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
        },
    ];

    function handleThisMonth() {
        return setDate(month);
    }

    function handleNexMonth() {
        if (date === 11) {
            return setDate(0);
        } else {
            return setDate(date + 1);
        }
    }
    return (
        <div>
            <div className='flex flex-col items-center'>
                <p className='font-medium font-Rubik text-center block sm:hidden text-lg my-2'>
                    Change Date
                </p>
                <div className='md:w-64 w-56 border-2 rounded-lg border-black sm:m-3 mb-2'>
                    <div className='grid grid-cols-7 justify-items-center m-3'>
                        {daysOfTheWeek &&
                            daysOfTheWeek.map((day) => {
                                return (
                                    <p key={day} className='text-xs font-bold'>
                                        {day}
                                    </p>
                                );
                            })}
                    </div>
                    <div className='grid grid-cols-7 gap-2 justify-items-center m-3'>
                        {months[date].days.map((day) => {
                            return <CalendarComponent day={day} key={day} />;
                        })}
                    </div>
                </div>
                <div className='flex flex-row justify-between md:w-64 w-56 sm:m-3 mb-2'>
                    <button
                        className='border-black border border-b-4 border-r-4 rounded-lg text-base sm:text-lg font-medium font-Rubik md:p-2 p-1'
                        onClick={handleThisMonth}
                    >
                        This Month
                    </button>
                    <button
                        className='border-black border border-b-4 border-r-4 rounded-lg text-base sm:text-lg font-medium font-Rubik md:p-2 p-1'
                        onClick={handleNexMonth}
                    >
                        Next Month
                    </button>
                </div>
            </div>
        </div>
    );
}
