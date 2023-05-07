import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

import { types } from "@/utils/types";

import Alertcomponent from "../Alertcomponent"; //custom alert messages
import Calendar from "../Calendar";
import DialogBox from "../DialogBox";
import Eventcard from "../Eventcard";
import Eventinerestcomponent from "../Eventinerestcomponent";
import LocationComponent from "../LocationComponent";
import paginate from "../PaginationComponent/paginate";
import Pagination from "../PaginationComponent/Pagination";
import { auth, db } from "../../../config/firebase";
// get the events and users collection
let eventsCollectionRef = collection(db, "events");
const usersCollectionRef = collection(db, "users");
const Eventslist = (props) => {
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
    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShowAlert(false);
        }, 4000);

        return () => {
            clearTimeout(timeId);
        };
    }, [showAlert]);
    // for the responsiveness of the phone to show the location, calendar and interset
    const [isOpencalender, setIsOpencalender] = useState(false);
    const [isOpeninterest, setIsOpeninterset] = useState(false);
    const [isOpenlocation, setIsOpenlocation] = useState(false);



    const [showModal, setShowModal] = useState(false);

    const myAlert = (message, type) => {
        if (alertType == "success") {
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
        } else if (alertType == "warning") {
            setAlertIcon(
                <svg
                    fill='none'
                    stroke='currentColor'
                    stroke-width='1.5'
                    class='h-5 w-5'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                >
                    <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                    ></path>
                </svg>
            );
        } else if (alertType == "error") {
            setAlertIcon(
                <svg
                    class='h-5 w-5'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='1.5'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                >
                    <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
                    ></path>
                </svg>
            );
        }

        setShowAlert(true);
        setAlertMessage(message);
        setAlertType(type);
    };

    // get all events from the events index
    const [entries, setEntries] = useState(props.items?.entries || []);

    // the page we are in we use this for pagination
    const [currentPage, setCurrentPage] = useState(1);
    // the sigle page can have only to events
    const pageSize = 2;

    // set the current Page with  selected page
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    // send to the paginate function the events , currentPage we are in and the page size which is 2
    // it will the return the indexes of events to show
    const paginatedPosts = paginate(entries, currentPage, pageSize);

    // user name state
    const [userName, setuserName] = useState("User");

    // Location info states
    const [city, setCity] = useState("City");
    const [country, setCountry] = useState("Country");

    // make all the checkboxes (titles) false
    const [checkedState, setCheckedState] = useState(
        new Array(types.length).fill(false)
    );

    // use state for filtering based on interest, country , city and date
    const [eventFilters, setEventFilters] = useState({
        types: [],
        country: "",
        city: "",
        dates: [],
    });

    // Function to handle date selection and update the event filters.
    const handleDate = (date) => {
        setEventFilters((prevFilters) => ({
            ...prevFilters,
            dates: [...date],
        }));
    };

    // Function to handle changes in the event filters inputs, including types, and update the state accordingly.
    const handleFilterChange = (event) => {
        const { name, value, checked } = event.target;

        if (name === "types") {
            setEventFilters({
                ...eventFilters,
                types: checked
                    ? [...eventFilters.types, value]
                    : eventFilters.types.filter((type) => type !== value),
            });
            const updatedCheckedState = checkedState.map((item, index) =>
                index == event.target.id ? !item : item
            );
            setCheckedState(updatedCheckedState);
        } else {
            setEventFilters({
                ...eventFilters,
                [name]: value,
            });
        }
    };

    // Function to retrieve filtered events based on the selected filters.
    const getFilters = async () => {
        // Get the events collection
        let myQ = eventsCollectionRef;

        // If there are types and the length is greater than 0
        if (eventFilters.types && eventFilters.types.length > 0) {
            myQ = query(
                myQ,
                where("types", "array-contains-any", eventFilters.types)
            );
        }

        // Go to the country doc and find the country that has been selected
        if (eventFilters.country) {
            myQ = query(myQ, where("country", "==", eventFilters.country));
        }

        // Go to the city doc and find the city that has been selected
        if (eventFilters.city) {
            myQ = query(myQ, where("city", "==", eventFilters.city));
        }

        // If there are dates and the length is greater than 0
        if (eventFilters.dates && eventFilters.dates.length > 0) {
            const dateQueries = eventFilters.dates.map((date) => {
                return query(myQ, where("eventDate", "==", date));
            });

            // Execute each date query and retrieve the matching data
            const datePromises = dateQueries.map((dateQuery) => {
                return getDocs(dateQuery);
            });

            const dateSnapshots = await Promise.all(datePromises);

            const dateEventsData = dateSnapshots.flatMap((snapshot) =>
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );

            setEntries(dateEventsData);
        } else {
            // If there are no dates specified, get all events
            const entries = await getDocs(myQ);
            const eventsData = entries.docs.map((entry) => ({
                id: entry.id,
                ...entry.data(),
            }));
            setEntries(eventsData);
        }
    };

    // useEffect hook to call the getFilters function when the event filters change.
    useEffect(() => {
        // get the country
        if (eventFilters.country) {
            setCountry(eventFilters.country);
        }
        // get the city
        if (eventFilters.city) {
            setCity(eventFilters.city);
        }
        // call the getFilters function
        getFilters();
    }, [eventFilters]);

    // State variable to store the authentication status of the user.
    const [isAuth, setIsAuth] = useState(null);

    // Function to handle joining an event. It checks if the user is authenticated,
    // if the user has already joined the event, and adds the user's attendance to the event.
    const joinEvent = async (id) => {
        // if the user is not auth send user to sign in
        try {
            if (!isAuth) {

                myAlert("Sign in to your account to join this event.", "error");


                return;
            }
            // got to the event attendance and using the event id
            const attendEventRef = collection(db, `events/${id}/attendEvent`);

            // Check if the user has already attended the event
            const querySnapshot = await getDocs(
                query(
                    attendEventRef,
                    where("userId", "==", auth.currentUser.uid)
                )
            );
            // if the user aready join
            if (!querySnapshot.empty) {
                myAlert("You have already attended this event.", "warning");

                return;
            }

            // If the user has not already attended the event, add their attendance
            await addDoc(attendEventRef, {
                userId: auth.currentUser.uid,
            });
            myAlert("You have joined the event!", "success");
        } catch (err) {
            console.error(err);
        }
    };

    // Function to retrieve the current user's information from the users collection.
    const getUserInfo = async () => {
        // go to the users collection and get the current user info using its id
        const q = query(
            usersCollectionRef,
            where("uid", "==", auth.currentUser?.uid)
        );
        try {
            const data = await getDocs(q);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            // get the user name to use it with welcome
            setuserName(filteredData[0].name);
        } catch (err) {
            console.error(err);
        }
    };

    // useEffect hook to check if the user is authenticated and update the isAuth state variable accordingly.
    // It also calls the getUserInfo function.
    useEffect(() => {
        // if the user auth set isAuth true and call getUserInfo function
        onAuthStateChanged(auth, (user) => {
            user ? getUserInfo() : "";
            user ? setIsAuth(true) : setIsAuth(null);
        });
    }, []);

    // for the responsiveness of the phoen
    const [overlay, setOverlay] = useState(false);
    function closeModels() {
        setIsOpencalender(false);
        setIsOpeninterset(false);
        setIsOpenlocation(false);
        setOverlay(!overlay);
    }
    return (
        <div className='container mx-auto md:m-8 m-2 font-Rubik'>
            <div className='font-Rubik flex flex-col items-center py-10 '>
                <div
                    onClick={closeModels}
                    className={`w-full fixed top-0 h-[50%] ${
                        overlay ? "block" : "hidden"
                    }`}
                ></div>
                {userName ? (
                    <p className='text-5xl md:font-extrabold font:medium '>
                        {t("eventlist.welcome")}, {userName}!
                    </p>
                ) : (
                    ""
                )}
                <p className='font-normal text-start'>
                    {t("eventlist.explore")}
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
                    <p className='pr-1 font-Rubik text-xs'>
                        {t("eventlist.changeInterest")}
                    </p>
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
                    <p className='pr-1 font-Rubik text-xs'>
                        {t("eventlist.changeLocation")}
                    </p>
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
                    <p className='pr-1 font-Rubik text-xs'>
                        {t("eventlist.changeDate")}
                    </p>
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
                        <Calendar myDate={handleDate} className='h-24' />
                    </div>

                    <div
                        className={`sm:block md:w-64 w-56 ${
                            isOpenlocation ? "block" : "hidden"
                        }`}
                    >
                        <LocationComponent
                            setShowModal={setShowModal}
                            city={city}
                            country={country}
                        />
                        <DialogBox
                            showModal={showModal}
                            setShowModal={setShowModal}
                            handleFilterChange={handleFilterChange}
                            entries={props.items?.entries}
                        />
                    </div>
                    <div
                        className={`sm:block ${
                            isOpeninterest ? " block" : "hidden"
                        }`}
                    >
                        <div>
                            <Eventinerestcomponent
                                checkedState={checkedState}
                                handleFilterChange={handleFilterChange}
                            />
                        </div>
                    </div>
                    {/* </div> */}
                </div>

                <div className='sm:col-span-2 col-span-3'>
                    {paginatedPosts.map((event) => {
                        return (
                            <div key={event.id} className='sm:order-1 order-2'>
                                <Eventcard
                                    key={event.id}
                                    eventImage={event.eventImage}
                                    eventDate={event.eventDate}
                                    eventDetails={event.description}
                                    eventTitle={event.title}
                                    eventAttendance={event.id}
                                    onClick={() => {
                                        // once the event clicked send the event id to joinEvent function
                                        joinEvent(event.id);
                                    }}
                                />
                            </div>
                        );
                    })}
                    <div className='md:order-2 order-1 text-center md:text-start'>
                        {entries.length > 0 ? (
                            <Pagination
                                items={entries.length} // number of events in db
                                currentPage={currentPage} // 1
                                pageSize={pageSize} // 2
                                onPageChange={onPageChange}
                            />
                        ) : (
                            <div class='flex flex-col items-center  h-screen'>
                                <div class='grid grid-cols-1 gap-4'>
                                    <div class='flex items-center justify-center'>
                                        <svg
                                            class='w-20 h-20 text-red-500'
                                            fill='none'
                                            stroke='currentColor'
                                            stroke-width='1.5'
                                            viewBox='0 0 24 24'
                                            xmlns='http://www.w3.org/2000/svg'
                                            aria-hidden='true'
                                        >
                                            <path
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                                d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                                            ></path>
                                        </svg>
                                    </div>
                                    <div class='flex items-center justify-center'>
                                        <p class='text-red-500'>
                                            There are no matching events for the
                                            filters you have selected.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

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
        </div>
    );
};

export default Eventslist;
