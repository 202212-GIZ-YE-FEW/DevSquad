import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "../../../config/firebase";
import { useRouter } from "next/router";
// import Pagination from "./Pagination";
import Eventcard from "../Eventcard";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
// this number of recoded
// let PageSize = 2;

const PaginationComponent = () => {
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
            const data = await getDocs(eventCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setEventList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };
    const [isAuth, setIsAuth] = useState(null);

    onAuthStateChanged(auth, (user) => {
        user ? setIsAuth(auth?.currentUser?.email) : setIsAuth(null);
    });
    const joinEvent = async (id) => {
        try {
            const attendEventRef = collection(db, `events/${id}/attendEvent`);
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
                            <Link href={`/eventPage/${item.id}`}>
                                <div className='sm:order-1 order-2'>
                                    <Eventcard
                                        key={index}
                                        eventImage={item.eventImage}
                                        eventDate={item.eventDate}
                                        eventDetails={item.description}
                                        eventTitle={item.title}
                                        eventAttendance={item.id}
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
