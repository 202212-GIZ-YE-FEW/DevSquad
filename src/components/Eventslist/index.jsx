import React from "react";
import { useState } from "react";

import Calendar from "../Calendar";
import Eventinerestcomponent from "../Eventinerestcomponent";
import LocationComponent from "../LocationComponent";
import PaginationComponent from "../PaginationComponent";

const Eventslist = () => {
    const [overlay, setOverlay] = useState(false);
    const [isOpencalender, setIsOpencalender] = useState(false);
    const [isOpeninterest, setIsOpeninterset] = useState(false);
    const [isOpenlocation, setIsOpenlocation] = useState(false);

    function closeModels() {
        setIsOpencalender(false);
        setIsOpeninterset(false);
        setIsOpenlocation(false);
        setOverlay(!overlay);
    }

    return (
        <div className='md:m-8 m-2 font-Rubik'>
            <div
                onClick={closeModels}
                className={`w-full fixed top-0 h-[50%] ${
                    overlay ? "block" : "hidden"
                }`}
            ></div>
            <div className='font-Rubik flex flex-col items-center py-10 '>
                <p className='text-5xl md:font-extrabold font:medium '>
                    Welcome, John!
                </p>
                <p className='font-normal text-start'>
                    Explore and Join Events.
                </p>
            </div>
            <div className='flex justify-evenly md:pb-0 pb-4 pt-4 border-t-2 border-b-2 border-black md:border-0 sm:hidden'>
                <button
                    className='flex items-center p-1 border border-black rounded mr-1'
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpeninterset(!isOpeninterest);
                        setOverlay(!overlay);
                    }}
                >
                    <p className='pr-1 font-Rubik text-xs'>Change Interest</p>
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
                    className='flex items-center  p-1 border border-black rounded md:hidden mr-1'
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpenlocation(!isOpenlocation);
                        setOverlay(!overlay);
                    }}
                >
                    <p className='pr-1 font-Rubik text-xs'>Change Location</p>
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
                    className='flex items-center p-1 border border-black rounded sm:hidden'
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpencalender(!isOpencalender);
                        setOverlay(!overlay);
                    }}
                >
                    <p className='pr-1 font-Rubik text-xs'>Change Date</p>
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
            <div className='sm:grid sm:grid-cols-3 md:gap-6 sm:gap-3'>
                <div className='flex flex-col sm:items-center sm:space-y-6'>
                    <div
                        className={`sm:block sm:static sm:z-0
                        ${isOpencalender ? "block" : "hidden"}
                        `}
                    >
                        <Calendar className='h-24' />
                    </div>
                    <div
                        className={`sm:block md:w-64 w-56 ${
                            isOpenlocation ? "block" : "hidden"
                        }`}
                    >
                        <LocationComponent />
                    </div>
                    <div
                        className={`sm:block ${
                            isOpeninterest ? " block" : "hidden"
                        }`}
                    >
                        <Eventinerestcomponent />
                    </div>
                </div>
                <div className='sm:col-span-2 col-span-3'>
                    <PaginationComponent />
                </div>
            </div>
        </div>
    );
};

export default Eventslist;
