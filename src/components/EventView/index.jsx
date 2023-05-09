import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React from "react";
import { useEffect, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { ImLocation } from "react-icons/im";

import Alertcomponent from "../Alertcomponent";
import Buttoncomponent from "../Buttoncomponent";
import EventImage from "../../components/EventImage/index";
import { auth, db } from "../../../config/firebase";
export default function EventView(props) {
    const { t } = useTranslation("common");

    // alert
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [alertIcon, setAlertIcon] = useState(
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            class='h-5 w-5'
        >
            <path
                fill-rule='evenodd'
                d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
                clip-rule='evenodd'
            />
        </svg>
    );

    const [userName, setuserName] = useState();
    const [isAuth, setIsAuth] = useState(null);
    //1
    const [attendcount, setAttendcount] = useState();
    //2
    const [userAttend, setUserAttend] = useState([]);
    const threeUserForAttendance = [];
    const router = useRouter();
    // if the user is auth set isAuth to the user email if it's not set isAuth to null
    onAuthStateChanged(auth, (user) => {
        user ? setIsAuth(auth?.currentUser?.email) : setIsAuth(null);
    });
    // get the users collection
    const usersCollectionRef = collection(db, "users");

    // get the user info based on it's id
    const getUserInfo = async (id) => {
        const q = query(usersCollectionRef, where("uid", "==", id));
        try {
            const data = await getDocs(q);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setuserName(filteredData[0].name);
        } catch (err) {
            console.error(err);
        }
    };

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
                setUserAttend(userList);
            });

            // set all attendance of the event to attendcount using the length of the data
            // that get all user attendance
            setAttendcount(data.length);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShowAlert(false);
        }, 4000);

        return () => {
            clearTimeout(timeId);
        };
    }, [showAlert]);

    useEffect(() => {
        // once the page is open get the user name and the attendance of the event
        getUserInfo(props.entry.userId);
        attendEvent(props.id);
        // onAuthStateChanged(auth, (user) => {
        //     user ? attendEvent(props.id) : "";
        // });
    }, [userAttend]);

    const joinEvent = async (id) => {
        try {
            if (!isAuth) {
                alert(t("alert.eventview.signIn"));
                return;
            }

            const attendEventRef = collection(db, `events/${id}/attendEvent`);

            // Check if the user has already attended the event
            const querySnapshot = await getDocs(
                query(
                    attendEventRef,
                    where("userId", "==", auth.currentUser.uid)
                )
            );

            if (!querySnapshot.empty) {
                // alert("You have already attended this event.");
                setShowAlert(true);
                setAlertMessage(t("alert.eventview.alreadyAttended"));
                setAlertType("info");
                setAlertIcon(
                    <svg
                        fill='none'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        class='w-5 h-5 mr-2 text-white'
                    >
                        <path d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                    </svg>
                );
                return;
            }

            // If the user has not already attended the event, add their attendance
            await addDoc(attendEventRef, {
                userId: auth.currentUser.uid,
            });

            // alert("You have joined the event!");
            setShowAlert(true);
            setAlertMessage(t("alert.eventview.joinedEvent"));
            setAlertType("success");
            setAlertIcon(
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    class='h-5 w-5'
                >
                    <path
                        fill-rule='evenodd'
                        d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
                        clip-rule='evenodd'
                    />
                </svg>
            );
        } catch (err) {
            console.error(err);
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

    return (
        <div className='md:grid grid-rows-2 gap-2 justify-center mt-8 md:gap-14 flex flex-col'>
            <div className='sm:grid sm:gap-4 sm:justify-center md:grid-cols-2 flex flex-col'>
                <div className='sm:m-0 sm:grid sm:justify-items-center md:flex md:col-span-2 m-4 order-2 sm:order-1'>
                    <h1 className='text-2xl font-medium font-Rubik'>
                        {/* The oragnization event name */}
                        {props.entry?.title}
                    </h1>
                </div>

                <div className='grid justify-items-center md:flex md:items-center sm:order-2'>
                    <EventImage
                        pic={props.entry?.eventImage}
                        width='500px'
                        height='500px'
                        className='max-w-sm max-h-22'
                    />
                </div>

                {/* event info */}
                <div className='sm:grid sm:grid-cols-2 sm:justify-items-center md:flex md:flex-col order-last sm:order-3'>
                    <div className='md:space-y-4 sm:m-2 mb-4'>
                        {/* location */}
                        <div className='flex flex-row items-center'>
                            <ImLocation className='w-8' />
                            <p className='font-medium font-Rubik truncate overflow-hidden w-40'>
                                {/* City, Country */}
                                {props.entry?.location}
                            </p>
                        </div>

                        {/* Date and place */}
                        <div className='flex flex-row items-center ml-8 md:ml-0'>
                            <AiFillClockCircle className='w-8 hidden md:block' />
                            <p className='text-gray-500 font-Rubik '>
                                {/* place of event and date */}
                                {props.entry?.eventDate}
                            </p>
                        </div>
                    </div>

                    <div className='space-y-4 m-2'>
                        {/* attendance */}
                        <div className='flex flex-row items-center'>
                            <div>
                                {userAttend && (
                                    <>
                                        <div>
                                            <div class='relative inline-flex items-center justify-center sm:w-8 w-6 sm:h-8 h-6 bg-black rounded-full'>
                                                <span class='text-white font-Rubik'>
                                                    {threeUserForAttendance[0]}
                                                </span>
                                            </div>
                                            <div class='sm:-left-4 -left-3 relative inline-flex items-center justify-center sm:w-8 w-6 sm:h-8 h-6 bg-black rounded-full'>
                                                <span class='text-white font-Rubik'>
                                                    {threeUserForAttendance[1]}
                                                </span>
                                            </div>
                                            <div class='sm:-left-8 -left-6 relative inline-flex items-center justify-center sm:w-8 w-6 sm:h-8 h-6 bg-black rounded-full'>
                                                <span class='text-white font-Rubik'>
                                                    {threeUserForAttendance[2]}
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <p className='font-Rubik'>
                                +{attendcount} {t("eventview.attendance")}
                            </p>
                        </div>

                        {/* Organized by who */}
                        <div className='flex flex-row items-center'>
                            <div class='relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-black rounded-full'>
                                <span class='s text-white font-Rubik'>
                                    {userName ? userName[0] : ""}
                                </span>
                            </div>
                            <p className='font-Rubik ml-2'>
                                {t("eventview.organizedBy")}
                                <span className='p-1'>{userName}</span>
                            </p>
                        </div>
                    </div>

                    <div className='col-span-2 grid justify-items-center md:flex md:px-3'>
                        <Buttoncomponent
                            font='font-Rubik'
                            bgColor='bg-orange-400'
                            fontSize='text-sm'
                            height='h-7'
                            width='w-44 sm:w-52'
                            hoverEffect='relative hover:bg-gradient-to-r hover:from-primary-orange hover:to-orange-200 hover:ring-2 hover:ring-offset-2 hover:ring-primary-orange transition-all ease-out duration-300'
                            borderRaduis='rounded-md'
                            textColor='text-white'
                            margin='mt-5'
                            label='JOIN'
                            onClick={() => {
                                joinEvent(props.id);
                            }}
                        />
                    </div>
                </div>
            </div>
            {/* for the description and attendance */}
            <div className='sm:grid sm:gap-5 sm:justify-center md:grid-cols-2 md:m-0 flex flex-col m-2 space-y-4 sm:space-y-0'>
                <div>
                    <h1 className='font-Rubik font-medium text-lg'>
                        {t("eventview.eventDescription")}{" "}
                    </h1>
                    <p className='font-Rubik text-gray-500 sm:max-w-md'>
                        {props.entry?.description}
                    </p>
                </div>

                <div>
                    <p className='font-medium font-Rubik text-lg mb-2'>
                        {t("eventview.attendance")}
                    </p>
                    <div className='grid grid-cols-3 gap-2 sm:grid-cols-6 max-w-md md:w-80 md:grid-cols-4'>
                        {/* map through all the attendance */}
                        {userAttend &&
                            userAttend.map((name, index) => {
                                return (
                                    <>
                                        <div className='flex flex-col items-center'>
                                            <div class='inline-flex items-center justify-center w-12 h-12 m-2 bg-black rounded-full'>
                                                <span class='font-medium text-white'>
                                                    {/* get the first letter of the name */}
                                                    {name[0]}
                                                </span>
                                            </div>
                                            <p className='font-Rubik md:text-base text-sm'>
                                                {name}
                                            </p>
                                        </div>
                                    </>
                                );
                            })}
                    </div>
                    {showAlert && (
                        <Alertcomponent
                            type={alertType}
                            message={alertMessage}
                            icon={alertIcon}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
