import Image from "next/image";
import React from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { ImLocation } from "react-icons/im";

import chart from "./Images/chart.png";
export default function EventView() {
    return (
        <div className='md:grid grid-rows-2 gap-2 justify-center mt-8 md:gap-14 flex flex-col'>
            {/* for image and some information about the event */}
            <div className='sm:grid sm:gap-4 sm:justify-center md:grid-cols-2 flex flex-col'>
                <div className='sm:m-0 sm:grid sm:justify-items-center md:flex md:col-span-2 m-4 order-2 sm:order-1'>
                    <h1 className='text-2xl font-medium font-Rubik'>
                        The oragnization event name
                    </h1>
                </div>

                <div className='grid justify-items-center md:flex md:items-center sm:order-2'>
                    <Image src={chart} alt='chart' className='w-5/6' />
                </div>

                {/* event info */}
                <div className='sm:grid sm:grid-cols-2 sm:justify-items-center md:flex md:flex-col order-last sm:order-3'>
                    <div className='md:space-y-4 sm:m-2 mb-4'>
                        {/* location */}
                        <div className='flex flex-row items-center'>
                            <ImLocation className='w-8' />
                            <p className='font-medium font-Rubik'>
                                City, Country
                            </p>
                        </div>

                        {/* Date and place */}
                        <div className='flex flex-row items-center ml-8 md:ml-0'>
                            <AiFillClockCircle className='w-8 hidden md:block' />
                            <p className='text-gray-500 font-Rubik '>
                                place of event and date
                            </p>
                        </div>
                    </div>

                    <div className='space-y-4 m-2'>
                        {/* attendance */}
                        <div className='flex flex-row items-center'>
                            <div>
                                <div class='relative inline-flex items-center justify-center w-8 h-8 bg-black rounded-full'>
                                    <span class='text-white font-Rubik'>R</span>
                                </div>
                                <div class='-left-4 relative inline-flex items-center justify-center w-8 h-8 bg-black rounded-full'>
                                    <span class='text-white font-Rubik'>R</span>
                                </div>
                                <div class='-left-8 relative inline-flex items-center justify-center w-8 h-8 bg-black rounded-full'>
                                    <span class='text-white font-Rubik'>R</span>
                                </div>
                            </div>
                            <p className='font-Rubik'>+12 Attendance</p>
                        </div>

                        {/* Organized by who */}
                        <div className='flex flex-row items-center'>
                            <div class='relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-black rounded-full'>
                                <span class=' text-white font-Rubik'>J</span>
                            </div>
                            <p className='font-Rubik ml-2'>
                                Organized by the name
                            </p>
                        </div>
                    </div>

                    <div className='col-span-2 grid justify-items-center md:flex md:px-3'>
                        <button className='font-Rubik bg-orange-400 text-sm h-7 w-44 sm:w-52 rounded-md text-white mt-5'>
                            JOIN
                        </button>
                    </div>
                </div>
            </div>
            {/* for the description and attendance */}
            <div className='sm:grid sm:gap-5 sm:justify-center md:grid-cols-2 md:m-0 flex flex-col m-2 space-y-4 sm:space-y-0'>
                <div>
                    <h1 className='font-Rubik font-medium text-lg'>
                        Event Description:
                    </h1>
                    <p className='font-Rubik text-gray-500 sm:max-w-md'>
                        The oldest classical British and Latin writing had
                        little or no space between words and could be written in
                        boustrophedon alternating directions. Over time, text
                        direction left to right became standardized. dividers
                        and terminal punctuation became common. The first way to
                        divide sentences into groups wa original paragraphos,
                        similar to an underscore at the beginning of the new
                        group. The Greek parágr evolved into the pilcrow, which
                        in English manuscripts in the Middle Ages can be seen
                        inserted inline between sentences.
                    </p>
                </div>

                <div>
                    <p className='font-medium font-Rubik text-lg mb-2'>
                        Attendance:
                    </p>
                    <div className='grid grid-cols-3 gap-2 sm:grid-cols-6 max-w-md md:w-80 md:grid-cols-4'>
                        <div className='flex flex-col items-center'>
                            <div class=' inline-flex items-center justify-center w-12 h-12 m-2 bg-black rounded-full'>
                                <span class='font-medium text-white'>R</span>
                            </div>
                            <p className='font-Rubik md:text-base text-sm'>
                                Jangis M.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
