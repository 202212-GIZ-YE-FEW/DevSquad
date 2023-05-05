import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

import EventImage from "../../components/EventImage/index";
import { db } from "../../../config/firebase";
const Eventcard = ({
    eventImage,
    eventDate,
    eventTitle,
    eventDetails,
    eventAttendance,
    onClick,
}) => {
    const [attendcount, setAttendcount] = useState();
    const attendEvent = async (id) => {
        try {
            // to get the number of attendance
            const attendEventRef = collection(db, `events/${id}/attendEvent`);
            const dataAttend = await getDocs(attendEventRef);
            const data = dataAttend.docs.map((entry) => entry.data());

            //1
            setAttendcount(data.length);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        // send the id of the event to attendEvent funciton to get the number of the attendance
        attendEvent(eventAttendance);
    }, [attendcount]);
    return (
        <div className='border-2 border-black rounded-lg md:px-4 mb-6 mt-3 font-Rubik w-full'>
            <div className='flex md:justify-between md:flex-row flex-col justify-center items-center'>
                <div>
                    <p className='pt-2'>{eventDate}</p>
                </div>
                <div className=' pt-2'>
                    {/* attendance */}
                    <div className='flex flex-row items-center'>
                        {/* <div>
                            <div class='relative inline-flex items-center justify-center sm:w-8 w-6 sm:h-8 h-6 bg-black rounded-full'>
                                <span class='text-white font-Rubik'>R</span>
                            </div>
                            <div class='sm:-left-4 -left-3 relative inline-flex items-center justify-center sm:w-8 w-6 sm:h-8 h-6 bg-black rounded-full'>
                                <span class='text-white font-Rubik'>R</span>
                            </div>
                            <div class='sm:-left-8 -left-6 relative inline-flex items-center justify-center sm:w-8 w-6 sm:h-8 h-6 bg-black rounded-full'>
                                <span class='text-white font-Rubik'>R</span>
                            </div>
                        </div> */}
                        <p className='font-Rubik p-2'>
                            +{attendcount} Attendance
                        </p>
                    </div>
                </div>
            </div>
            <div className='grid sm:grid-cols-3 align-items-center gap-4 p-4'>
                <div>
                    {/* <Image
                        src={eventImage}
                        alt='eventCardImage'
                        width={650}
                        height={380}
                        responsive
                        className='rounded border-2 border-black w-64 md:h-36 h-24'
                    /> */}
                    <EventImage
                        pic={eventImage}
                        alt='eventCardImage'
                        width={650}
                        height={380}
                        responsive
                        className='rounded border-2 border-black w-64 md:h-36 h-24'
                    />
                </div>
                <div className='col-span-2 flex flex-col'>
                    <Link
                        key={eventAttendance}
                        href={`/eventPage/${eventAttendance}`}
                    >
                        <p className='font-medium'>{eventTitle}</p>
                    </Link>
                    <p className='font-normal text-ellipsis overflow-hidden  w-80 sm:w-full'>
                        {eventDetails}
                    </p>
                    <div className='flex justify-end py-5'>
                        <button
                            className='bg-primary-orange text-white rounded px-8 py-1 relative hover:bg-gradient-to-r hover:from-primary-orange hover:to-orange-200 hover:ring-2 hover:ring-offset-2 hover:ring-primary-orange transition-all ease-out duration-300'
                            onClick={onClick}
                        >
                            Join
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Eventcard;
