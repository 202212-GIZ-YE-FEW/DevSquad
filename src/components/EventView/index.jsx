import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { ImLocation } from "react-icons/im";

import Buttoncomponent from "../Buttoncomponent";
import EventImage from "../../components/EventImage/index";
import { auth, db } from "../../../config/firebase";
export default function EventView(props) {
    const [userName, setuserName] = useState();
    const [isAuth, setIsAuth] = useState(null);
    //1
    const [attendcount, setAttendcount] = useState();
    //2
    const [userAttend, setUserAttend] = useState([]);
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
        // once the page is open get the user name and the attendance of the event
        getUserInfo(props.entry.userId);
        attendEvent(props.id);
        // onAuthStateChanged(auth, (user) => {
        //     user ? attendEvent(props.id) : "";
        // });
    }, [attendcount]);

    const joinEvent = async (id) => {
        try {
            const attendEventRef = collection(db, `events/${id}/attendEvent`);
            // if the user is auth add the user to attendance else send the user to the signin page
            isAuth
                ? await addDoc(attendEventRef, {
                      userId: auth.currentUser.uid,
                  })
                : router.push("/signin");

            isAuth
                ? alert("you are joined to the event")
                : alert("signIn to your account for join to this event");
        } catch (err) {
            console.error(err);
        }
    };

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
                                {/* <div class='relative inline-flex items-center justify-center w-8 h-8 bg-black rounded-full'>
                                    <span class='text-white font-Rubik'>R</span>
                                </div>
                                <div class='-left-4 relative inline-flex items-center justify-center w-8 h-8 bg-black rounded-full'>
                                    <span class='text-white font-Rubik'>R</span>
                                </div>
                                <div class='-left-8 relative inline-flex items-center justify-center w-8 h-8 bg-black rounded-full'>
                                    <span class='text-white font-Rubik'>R</span>
                                </div> */}
                            </div>
                            <p className='font-Rubik'>
                                +{attendcount} Attendance
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
                                Organized by {userName}
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
                        Event Description:
                    </h1>
                    <p className='font-Rubik text-gray-500 sm:max-w-md'>
                        {props.entry?.description}
                    </p>
                </div>

                <div>
                    <p className='font-medium font-Rubik text-lg mb-2'>
                        Attendance:
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
                </div>
            </div>
        </div>
    );
}
