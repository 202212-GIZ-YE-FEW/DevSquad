import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Eventcard from "../Eventcard";
import { auth, db } from "../../../config/firebase";
// this number of recoded
// PageSize = 2;

const PaginationComponent = () => {
    // get all the events from events collection
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
    const joinEvent = async (id) => {
        try {
            // go to the event attend collection
            const attendEventRef = collection(db, `events/${id}/attendEvent`);
            // if the user is auth add the user id to the attendance doc if not sent the signin page
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
            </div>
        </>
    );
};

export default PaginationComponent;
