import React from "react";
import { useState } from "react";

import Calendar from "../Calendar";
import Eventinerestcomponent from "../Eventinerestcomponent";
import PaginationComponent from "../PaginationComponent";

const Eventslist = () => {
    const [isOpencalender, setIsOpencalender] = useState(false);
    const [isOpeninterest, setIsOpeninterset] = useState(false);
    const [isOpenlocation, setIsOpenlocation] = useState(false);

    return (
        <div className='container mx-auto lg:px-16 md:px-10 font-Rubik'>
            <div className='font-Rubik flex flex-col items-center py-10 '>
                <p className='text-5xl md:font-extrabold font:medium '>
                    Welcome, John!
                </p>
                <p className='font-normal text-start'>
                    Explore and Join Events.
                </p>
            </div>
            <div className='flex justify-evenly  md:pb-0 pb-4 border-t-2 border-b-2 border-black md:border-0'>
                <button
                    className='flex items-center  p-2 border border-black rounded mt-4 md:hidden'
                    onClick={() => setIsOpeninterset(!isOpeninterest)}
                >
                    <p className='px-2 font-Rubik'>Change Interest</p>
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
                <button
                    className='flex items-center  p-2 border border-black rounded mt-4 md:hidden'
                    onClick={() => setIsOpenlocation(!isOpenlocation)}
                >
                    <p className='px-2 font-Rubik'>Change Location</p>
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
                <button
                    className='flex items-center  p-2 border border-black rounded mt-4 sm:hidden'
                    onClick={() => setIsOpencalender(!isOpencalender)}
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
            </div>
            <div className='grid grid-cols-3 px-10'>
                <div className='flex flex-col items-center h-full  '>
                    <div
                        className={`sm:w-80 sm:block sm:static sm:z-0 fixed z-50 top-0 left-0  bg-opacity-50 sm:opacity-100 transition-opacity  ${
                            isOpencalender ? "" : "opacity-0"
                        }`}
                    >
                        <Calendar className=' h-24' />
                    </div>
                    <div className='flex flex-col items-center h-full '>
                        <div
                            className={`sm:w-80 sm:block sm:static sm:z-0	fixed z-50 top-0 left-0  bg-opacity-50 sm:opacity-100 transition-opacity  ${
                                isOpenlocation ? "" : "opacity-0 "
                            }`}
                        >
                            <div className='fixed sm:static sm:z-0 z-50 top-1/2 left-1/2 sm:transform-none transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-4  w-full sm:w-80 h-80 sm:h-full'>
                                <div className='border-t-2 border-b-2 border-black h-32 font-medium text-center  w-full flex flex-col'>
                                    <button className='underline p-2'>
                                        Change Location
                                    </button>
                                    <p className='border-black border border-b-4 border-r-4 rounded-lg text-base sm:text-lg font-medium font-Rubik sm:p-2 p-1 w-full'>
                                        İzmir, TR
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`sm:w-80 sm:block sm:static sm:z-0	fixed z-50 top-0 left-0  bg-opacity-50 sm:opacity-100 transition-opacity  ${
                                isOpeninterest ? "" : "opacity-0 "
                            }`}
                        >
                            <div className=''>
                                <Eventinerestcomponent />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='md:col-span-2 col-span-3'>
                    <PaginationComponent />
                </div>
            </div>
        </div>
    );
};

export default Eventslist;
