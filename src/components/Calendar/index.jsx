import React from "react";
import { useState } from "react";

import CalendarComponent from "./CalendarComponent";

export default function Calendar() {
    const [isOpen, setIsOpen] = useState(false);
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
        <>
            <div
                className={`sm:w-80 sm:block sm:static sm:z-0	fixed z-50 top-0 left-0  bg-opacity-50 sm:opacity-100 transition-opacity  ${
                    isOpen ? "" : "opacity-0 pointer-events-none"
                }`}
            >
                <div className='sm:block flex-col items-center fixed sm:static sm:z-0 z-50 top-1/2 left-1/2 sm:transform-none transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-sm p-4  w-full sm:w-80  '>
                    <p className='font-medium font-Rubik text-center block sm:hidden text-lg m-2'>
                        Change Date
                    </p>
                    <div className='sm:w-64 w-56 border-2 rounded-lg border-black sm:m-3 mb-2'>
                        <div className='grid grid-cols-7 justify-items-center m-3'>
                            {daysOfTheWeek &&
                                daysOfTheWeek.map((day) => {
                                    return (
                                        <p
                                            key={day}
                                            className='text-xs font-bold'
                                        >
                                            {day}
                                        </p>
                                    );
                                })}
                        </div>
                        <div className='grid grid-cols-7 gap-2 justify-items-center m-3'>
                            {months[date].days.map((day) => {
                                return (
                                    <CalendarComponent day={day} key={day} />
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <button
                            className='border-black border border-b-4 border-r-4 rounded-lg text-base sm:text-lg font-medium font-Rubik sm:p-2 p-1 sm:m-3 m-1'
                            onClick={handleThisMonth}
                        >
                            This Month
                        </button>
                        <button
                            className='border-black border border-b-4 border-r-4 rounded-lg text-base sm:text-lg font-medium font-Rubik sm:p-2 p-1 sm:m-3'
                            onClick={handleNexMonth}
                        >
                            Next Month
                        </button>
                    </div>
                </div>
            </div>
            <button
                className='flex items-center  p-2 border border-black rounded mt-4 sm:hidden'
                onClick={() => setIsOpen(!isOpen)}
            >
                <p className='px-2 font-Rubik'>Change Date</p>
                <svg
                    width='13'
                    height='8'
                    viewBox='0 0 13 8'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M11.4704 0.705392C11.6865 0.465228 12.0564 0.445759 12.2965 0.661906C12.5366 0.878053 12.5561 1.24797 12.34 1.48813L7.07538 7.3385C6.84301 7.59672 6.43816 7.59672 6.20579 7.3385L0.941182 1.48813C0.725065 1.24797 0.744531 0.878053 0.984662 0.661906C1.22479 0.445759 1.59465 0.465228 1.81077 0.705392L6.64058 6.07259L11.4704 0.705392Z'
                        fill='#1A1A1A'
                    />
                </svg>
            </button>
        </>
    );
}
