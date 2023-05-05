import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "../../../config/firebase";
import { useRouter } from "next/router";
import Eventcard from "../Eventcard";
import Link from "next/link";
import Alertcomponent from "../Alertcomponent";
import { onAuthStateChanged } from "firebase/auth";
// this number of recoded
// PageSize = 2;

const PaginationComponent = () => {
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
    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShowAlert(false);
        }, 4000);

        return () => {
            clearTimeout(timeId);
        };
    }, [showAlert]);
    // const data = [
    //     {
    //         id: 999,
    //         eventImage: "/images/Rectangle2.png",
    //         eventDate: "FRI, JUL -7:00 PM GMT+3",
    //         eventTitle: "Title of the Event1",
    //         eventDetails:
    //             "Details about the event. Lorem ipsum dolor sit ametz consectetur adipiscing elit, sed do eiusmod tempor incididuntuyuuyii iyooyi Lorem ipsum dolor sit ame consectetur, adipisicing elit. Deleniti quos pariat nemo veritatis repudiandae error suscipit. Quas saepe vel cupiditate, ipsa adipisci excepturi animi magnam facere culpa aliquam asperiores!",
    //         eventAttendance: [],
    //     },
    //     {
    //         id: 1000,
    //         eventImage: "/images/Rectangle2.png",
    //         eventDate: "FRI, JUL -7:00 PM GMT+3",
    //         eventTitle: "Title of the Event2",
    //         eventDetails:
    //             "Details about the event. Lorem ipsum dolor sit ametz consectetur adipiscing elit, sed do eiusmod tempor incididuntuyuuyii iyooyi Lorem ipsum dolor sit ame consectetur, adipisicing elit. Deleniti quos pariat nemo veritatis repudiandae error suscipit. Quas saepe vel cupiditate, ipsa adipisci excepturi animi magnam facere culpa aliquam asperiores!",
    //         eventAttendance: [],
    //     },
    //     {
    //         id: 1000,
    //         eventImage: "/images/Rectangle2.png",
    //         eventDate: "FRI, JUL -7:00 PM GMT+3",
    //         eventTitle: "Title of the Event2",
    //         eventDetails:
    //             "Details about the event. Lorem ipsum dolor sit ametz consectetur adipiscing elit, sed do eiusmod tempor incididuntuyuuyii iyooyi Lorem ipsum dolor sit ame consectetur, adipisicing elit. Deleniti quos pariat nemo veritatis repudiandae error suscipit. Quas saepe vel cupiditate, ipsa adipisci excepturi animi magnam facere culpa aliquam asperiores!",
    //         eventAttendance: [],
    //     },
    // ];

    // const onPageChange = (page) => {
    //     setCurrentPage(page);
    // };
    const eventCollectionRef = collection(db, "events");
    const [eventList, setEventList] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const currentTableData = useMemo(() => {
    //     const firstPageIndex = (currentPage - 1) * PageSize;
    //     const lastPageIndex = firstPageIndex + PageSize;
    //     return data.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage]);
    const router = useRouter();

    const getEventList = async () => {
        try {
            // get the docs of of event in events collection
            const data = await getDocs(eventCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            // store the data in eventList useState as an array
            setEventList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };
    const [isAuth, setIsAuth] = useState(null);

    onAuthStateChanged(auth, (user) => {
        // if the user is auth set isAuth to the current user email if not set isAuth to null
        user ? setIsAuth(auth?.currentUser?.email) : setIsAuth(null);
    });
    // const joinEvent = async (id) => {
    //     try {
    //         const attendEventRef = collection(db, `events/${id}/attendEvent`);
    //         isAuth
    //             ? await addDoc(attendEventRef, {
    //                   userId: auth.currentUser.uid,
    //               })
    //             : router.push("/signin");

    //         isAuth
    //             ? alert("you are joined to the event")
    //             : alert("signIn to your account for join to this event");
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
    const joinEvent = async (id) => {
        try {
            const attendEventRef = collection(db, `events/${id}/attendEvent`);
            isAuth
                ? await addDoc(attendEventRef, {
                      userId: auth.currentUser.uid,
                  })
                : router.push("/signin");

            // alert("You have joined the event!");
            setShowAlert(true);
            setAlertMessage("You have joined the event!");
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
    useEffect(() => {
        getEventList();
    }, []);

    return (
        <>
            <div className='flex flex-col'>
                {/* this is example replase it with events list */}

                {/* {currentTableData.map((item, index) => {
                    return (
                        <>
                            <div className='sm:order-1 order-2'>
                                <Eventcard
                                    key={index}
                                    eventImage={item.eventImage}
                                    eventDate={item.eventDate}
                                    eventDetails={item.eventDetails}
                                    eventTitle={item.eventTitle}
                                    eventAttendance={item.eventAttendance}
                                />
                            </div>
                        </>
                    );
                })} */}

                {eventList.map((item, index) => {
                    return (
                        <>
                            {/* once is clicked go to the event page with the event id */}
                            <Link href={`/eventPage/${item.id}`}>
                                <div className='sm:order-1 order-2'>
                                    <Eventcard
                                        key={index}
                                        eventImage={item.eventImage}
                                        eventDate={item.eventDate}
                                        eventDetails={item.description}
                                        eventTitle={item.title}
                                        eventAttendance={item.id}
                                        // once is clicked sent the event id to the joinEvent function
                                        onClick={() => {
                                            joinEvent(item.id);
                                        }}
                                    />
                                </div>
                            </Link>
                        </>
                    );
                })}

                {/* <div className='md:order-2 order-1 text-center md:text-start'>
                    <Pagination
                        currentPage={currentPage}
                        // totalCount={data.length}
                        pageSize={PageSize}
                        onPageChange={onPageChange}
                    />
                </div> */}
                {showAlert && (
                    <Alertcomponent
                        type={alertType}
                        message={alertMessage}
                        icon={alertIcon}
                    />
                )}
            </div>
        </>
    );
};

export default PaginationComponent;
