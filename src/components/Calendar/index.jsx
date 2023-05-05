import { useTranslation } from "next-i18next";
import React from "react";
import { useState } from "react";

import CalendarComponent from "./CalendarComponent";

export default function Calendar({ myDate }) {
    const { t } = useTranslation("common");
    // is a built in object in js to get the date
    let d = new Date();
    // to get the current year
    let year = d.getFullYear();
    // to get the current month
    let month = d.getMonth();
    // to send the selected date to Eventslist
    const hundelDate = (date) => {
        myDate(date);
    };
    // set date to the current month
    const [date, setDate] = useState(month);
    const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    // an array of object to display all months
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

    // once the user click the button it will return the user to the current month
    function handleThisMonth() {
        return setDate(month);
    }

    // every time the user click on the button the user will move between the months
    function handleNexMonth() {
        // if the user reach the 12 it will return to 1
        if (date === 11) {
            return setDate(0);
        } else {
            return setDate(date + 1);
        }
    }
    return (
        <div className='fixed sm:static sm:z-0 z-50 top-1/2 left-1/2 sm:transform-none transform -translate-x-1/2 bg-white w-full sm:w-0 sm:h-full h-[80vh] shadow-inner sm:shadow-none shadow-gray-700 rounded-lg'>
            <div className='flex flex-col items-center'>
                <p className='font-medium font-Rubik text-center block sm:hidden text-lg my-2'>
                    {t("calendar.date")}
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
                            return (
                                <CalendarComponent
                                    key={day}
                                    day={day}
                                    year={year}
                                    month={date + 1}
                                    date={hundelDate}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className='flex flex-row justify-between md:w-64 w-56 sm:m-3 mb-2'>
                    <button
                        className='border-black border border-b-4 border-r-4 rounded-lg text-base sm:text-lg font-medium font-Rubik md:p-2 p-1'
                        onClick={handleThisMonth}
                    >
                        {t("calendar.thismonth")}
                    </button>
                    <button
                        className='border-black border border-b-4 border-r-4 rounded-lg text-base sm:text-lg font-medium font-Rubik md:p-2 p-1'
                        onClick={handleNexMonth}
                    >
                        {t("calendar.nextmonth")}
                    </button>
                </div>
            </div>
        </div>
    );
}
