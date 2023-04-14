import React from "react";

import Calendar from "../Calendar";
import Eventcard from "../Eventcard";
import Eventinerestcomponent from "../Eventinerestcomponent";
import PaginationComponent from "../PaginationComponent";

const Eventslist = () => {
    return (
        <div className='container mx-auto lg:px-32 md:px-10 font-Rubik'>
            <div className='font-Rubik flex flex-col justify-center items-center py-10 '>
                <p className='text-5xl font-medium '>Welcome, John!</p>
                <p className='font-normal text-start'>
                    Explore and Join Events.
                </p>
            </div>
            <div className='grid grid-cols-3 '>
                <div className='flex flex-col items-center h-full '>
                    <Calendar className=' h-24' />
                    <div className='border-t-2 border-b-2 border-black h-32 font-medium text-center  w-52 '>
                        <button className='underline p-2'>
                            Change Location
                        </button>
                        <p className='border-black border border-b-4 border-r-4 rounded-lg text-base sm:text-lg font-medium font-Rubik sm:p-2 p-1 sm:m-3 w-full'>
                            İzmir, TR
                        </p>
                    </div>
                    <div className=''>
                        <Eventinerestcomponent />
                    </div>
                </div>
                <div className='col-span-2'>
                    <PaginationComponent />
                </div>
            </div>
        </div>
    );
};

export default Eventslist;
