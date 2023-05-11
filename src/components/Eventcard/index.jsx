import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { useTranslation } from "next-i18next";
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
    const { t } = useTranslation("common");

    const [attendcount, setAttendcount] = useState();
    const [userAttend, setUserAttend] = useState([]);
    const threeUserForAttendance = [];

    const attendEvent = async (id) => {
        try {
            const userList = [];
            const usersCollectionRef = collection(db, "users");
            // go to the event attend and get all the attendance
            const attendEventRef = collection(db, `events/${id}/attendEvent`);
            const dataAttend = await getDocs(attendEventRef);

            const data = dataAttend.docs.map(async (entry) => {
                const user = entry.data(); //get userId as object
                // get the user attend from the attendEvent doc usitn the user id
                const users = await getDocs(
                    query(usersCollectionRef, where("uid", "==", user.userId))
                );

                users.docs.map((doc) => {
                    // get the name of the users they attend
                    const userData = doc.data();
                    userList.push(userData.name);
                });

                // add the users that attend the event to userAttend array
                userAttend.length;
                setUserAttend(userList);
            });
            // set all attendance of the event to attendcount using the length of the data
            // that get all user attendance
            setAttendcount(data.length);
        } catch (error) {
            console.error(error);
        }
    };

    // to show only the required attendance
    if (userAttend.length === 0) {
        for (let i = 0; i < 3; i++) {
            threeUserForAttendance.push(null);
        }
    } else if (userAttend.length === 1) {
        threeUserForAttendance.push(userAttend[0].charAt(0));
        threeUserForAttendance.push("-");
        threeUserForAttendance.push("-");
    } else if (userAttend.length === 2) {
        threeUserForAttendance.push(userAttend[0].charAt(0));
        threeUserForAttendance.push(userAttend[1].charAt(0));
        threeUserForAttendance.push("-");
    } else {
        for (let i = 0; i < 3; i++) {
            threeUserForAttendance.push(userAttend[i].charAt(0));
        }
    }

    useEffect(() => {
        // send the id of the event to attendEvent funciton to get the number of the attendance
        attendEvent(eventAttendance);
    }, [userAttend]);
    const { i18n } = useTranslation();
    return (
        <div className='border-2 border-black rounded-lg md:px-4 mb-6 mt-3 font-Rubik w-full'>
            <div className='flex md:justify-between md:flex-row flex-col justify-center items-center'>
                <div>
                    <p className='pt-2'>{eventDate}</p>
                </div>
                <div className=' pt-2'>
                    {/* attendance */}
                    <div className='flex flex-row items-center'>
                        {userAttend && (
                            <>
                                <div>
                                    <div class='relative inline-flex items-center justify-center sm:w-8 w-6 sm:h-8 h-6 bg-black rounded-full'>
                                        <span class='text-white font-Rubik'>
                                            {threeUserForAttendance[0]}
                                        </span>
                                    </div>
                                    <div
                                        class={` ${
                                            i18n.language === "en"
                                                ? "sm:-left-4 -left-3"
                                                : "sm:-right-4 -right-3"
                                        }relative inline-flex items-center justify-center sm:w-8 w-6 sm:h-8 h-6 bg-black rounded-full`}
                                    >
                                        <span class='text-white font-Rubik'>
                                            {threeUserForAttendance[1]}
                                        </span>
                                    </div>
                                    <div
                                        class={` ${
                                            i18n.language === "en"
                                                ? "sm:-left-8 -left-6"
                                                : "sm:-right-8 -right-6"
                                        } relative inline-flex items-center justify-center sm:w-8 w-6 sm:h-8 h-6 bg-black rounded-full`}
                                    >
                                        <span class='text-white font-Rubik'>
                                            {threeUserForAttendance[2]}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}

                        <p className='font-Rubik p-2'>
                            +{attendcount} {t("eventcard.attendance")}
                        </p>
                    </div>
                </div>
            </div>
            <div className='grid sm:grid-cols-3 align-items-center gap-4 p-4'>
                <div>
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
                            {t("eventcard.join")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Eventcard;
