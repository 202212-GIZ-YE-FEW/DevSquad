import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Calendar from "../Calendar";
import Checkboxcomponent from "../Checkboxcomponent";
import Eventcard from "../Eventcard";
import paginate from "../PaginationComponent/paginate";
import Pagination from "../PaginationComponent/Pagination";
import { auth, db } from "../../../config/firebase";
let eventsCollectionRef = collection(db, "events");
const usersCollectionRef = collection(db, "users");
const Eventslist = (props) => {
    const [isOpencalender, setIsOpencalender] = useState(false);
    const [isOpeninterest, setIsOpeninterset] = useState(false);
    const [isOpenlocation, setIsOpenlocation] = useState(false);
    const [userName, setuserName] = useState("asd");
    const titles = [
        "All",
        "No Poverty",
        "Zero Hunger",
        "Good Health And Well-Being",
        "Quality Education",
        "Gender Equality",
        "Clean Water And Sanitation",
        "Affordable And Clean Energy",
        "Decent Work And Economic Growth",
        "Industry Innovation And Infrastructure",
        "Reduced Inequalities",
        "Sustainable Cities And Communities",
        "Responsible Consumption And Production",
        "Climate Action",
        "Life Below Water",
        "Life On Land",
        "Peace And Justice And Strong Institutions",
    ];
    /////////
    const [showModal, setShowModal] = useState(false);
    // const [location, setLocation] = useState("");
    const [city, setCity] = useState("Izmer");
    const [country, setCountry] = useState("");
    const [checkedState, setCheckedState] = useState(
        new Array(titles.length).fill(false)
    );
    // const getLocation = (param) => {
    //     setLocation(param);
    // };

    // const getCity = (param) => {
    //     setCity(param);
    // };

    // const getCountry = (param) => {
    //     setCountry(param);
    // };
    const [entries, setEntries] = useState(props.items?.entries || []);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 2;

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedPosts = paginate(entries, currentPage, pageSize);
    //////////filters

    const [eventFilters, setEventFilters] = useState({
        types: [],
        country: "",
        city: "",
        date: "",
    });

    const hundelDate = (date) => {
        if (eventFilters.date != "") {
            setEventFilters({
                ...eventFilters,
                date: "",
            });
        } else {
            setEventFilters({
                ...eventFilters,
                date: date[0],
            });
        }

        console.log(eventFilters);
    };

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

        console.log(eventFilters);
    };

    const getFilters = async () => {
        let myQ = eventsCollectionRef;

        if (eventFilters.types && eventFilters.types.length > 0) {
            myQ = query(
                myQ,
                where("types", "array-contains-any", eventFilters.types)
            );
        }
        if (eventFilters.country) {
            myQ = query(myQ, where("country", "==", eventFilters.country));
        }
        if (eventFilters.city) {
            myQ = query(myQ, where("city", "==", eventFilters.city));
        }
        if (eventFilters.date) {
            myQ = query(myQ, where("eventDate", "==", eventFilters.date));
        }

        const entries = await getDocs(myQ);
        const eventsData = entries.docs.map((entry) => ({
            id: entry.id,
            ...entry.data(),
        }));
        setEntries(eventsData);
    };

    useEffect(() => {
        if (eventFilters.country) {
            setCountry(eventFilters.country);
        }

        if (eventFilters.city) {
            setCity(eventFilters.city);
        }
        getFilters();
    }, [eventFilters]);

    // }, [eventFilters]);
    const [isAuth, setIsAuth] = useState(null);
    // const router = useRouter();
    // onAuthStateChanged(auth, (user) => {
    //     user ? setIsAuth(auth?.currentUser?.email) : setIsAuth(null);
    // });
    // const joinEvent = async (id) => {
    //     try {
    //         const attendEventRef = collection(db, `events/${id}/attendEvent`);
    //         if (isAuth) {
    //             await addDoc(attendEventRef, {
    //                 userId: auth.currentUser.uid,
    //             })
    //             alert("you are joined to the event")
    //         } else {
    //             alert("signIn to your account for join to this event");
    //         }

    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const joinEvent = async (id) => {
        try {
            if (!isAuth) {
                alert("Sign in to your account to join this event.");
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
                alert("You have already attended this event.");
                return;
            }

            // If the user has not already attended the event, add their attendance
            await addDoc(attendEventRef, {
                userId: auth.currentUser.uid,
            });

            alert("You have joined the event!");
        } catch (err) {
            console.error(err);
        }
    };

    const getUserInfo = async () => {
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
            setuserName(filteredData[0].name);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            user ? getUserInfo() : "";
            user ? setIsAuth(true) : setIsAuth(null);
        });
    }, [0]);

    return (
        <div className='md:m-8 m-2 font-Rubik'>
            <div className='font-Rubik flex flex-col items-center py-10 '>
                {/* <p className='text-5xl md:font-extrabold font:medium '>
                    Welcome, John!
                </p> */}
                <p className='text-5xl md:font-extrabold font:medium '>
                    Welcome, {userName}!
                </p>
                <p className='font-normal text-start'>
                    Explore and Join Events.
                </p>
            </div>
            <div className='flex justify-evenly md:pb-0 pb-4 pt-4 border-t-2 border-b-2 border-black md:border-0 sm:hidden'>
                <button
                    className='flex items-center p-1 border border-black rounded mr-1'
                    onClick={() => setIsOpeninterset(!isOpeninterest)}
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
                    onClick={() => setIsOpenlocation(!isOpenlocation)}
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
                    onClick={() => setIsOpencalender(!isOpencalender)}
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
                        <Calendar myDate={hundelDate} className='h-24' />
                    </div>
                    {/* <div className='flex flex-col items-center h-full '> */}
                    <div
                        className={`sm:block md:w-64 w-56 ${
                            isOpenlocation ? "block" : "hidden"
                        }`}
                    >
                        <div className=' bg-white rounded-md'>
                            <div className='border-t-2 border-b-2 border-black h-32 font-medium text-center w-full'>
                                <button
                                    className='underline p-2'
                                    onClick={() => setShowModal(true)}
                                >
                                    Change Location
                                </button>
                                <p className='border-black border border-b-4 border-r-4 rounded-lg text-base sm:text-lg font-medium font-Rubik sm:p-2 p-1 w-full'>
                                    {city} {country ? " / " + country : ""}
                                </p>
                            </div>
                        </div>
                        {showModal ? (
                            <>
                                <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                                    <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                                        {/*content*/}
                                        <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                                            {/*header*/}
                                            <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                                                <h3 className='text-3xl font-semibold'>
                                                    choose your Location
                                                </h3>
                                                <button
                                                    className='p-1 ml-auto bg-transparent border-0 text-black opacity-9 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                                                    onClick={() =>
                                                        setShowModal(false)
                                                    }
                                                >
                                                    <span className='bg-transparent text-black opacity-9 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                                                        ×
                                                    </span>
                                                </button>
                                            </div>
                                            {/*body*/}
                                            <div className='relative p-6 flex-auto'>
                                                <p className='my-4 text-slate-500 text-lg leading-relaxed'>
                                                    <select
                                                        className='w-9/12'
                                                        name='country'
                                                        id='country'
                                                        onChange={
                                                            handleFilterChange
                                                        }
                                                    >
                                                        <option>country</option>
                                                        {Array.from(
                                                            new Set(
                                                                props.items.entries.map(
                                                                    (eve) =>
                                                                        eve.country
                                                                )
                                                            )
                                                        )
                                                            .filter(
                                                                (country) =>
                                                                    country
                                                            ) // filter out empty values
                                                            .map((country) => (
                                                                <option
                                                                    key={
                                                                        country
                                                                    }
                                                                    value={
                                                                        country
                                                                    }
                                                                >
                                                                    {country}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </p>
                                                <p className='my-4 text-slate-500 text-lg leading-relaxed'>
                                                    <select
                                                        className='w-9/12'
                                                        name='city'
                                                        id='city'
                                                        onChange={
                                                            handleFilterChange
                                                        }
                                                    >
                                                        <option>city</option>

                                                        {Array.from(
                                                            new Set(
                                                                props.items.entries.map(
                                                                    (eve) =>
                                                                        eve.city
                                                                )
                                                            )
                                                        )
                                                            .filter(
                                                                (city) => city
                                                            ) // filter out empty values
                                                            .map((city) => (
                                                                <option
                                                                    key={city}
                                                                    value={city}
                                                                >
                                                                    {city}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </p>
                                            </div>
                                            {/*footer*/}
                                            <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                                                <button
                                                    className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                                    type='button'
                                                    onClick={() =>
                                                        setShowModal(false)
                                                    }
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                                    type='button'
                                                    onClick={() =>
                                                        setShowModal(false)
                                                    }
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
                            </>
                        ) : null}
                    </div>
                    <div
                        className={`sm:block ${
                            isOpeninterest ? " block" : "hidden"
                        }`}
                    >
                        <div className=''>
                            {/* <Eventinerestcomponent onChange={handleFilterChange} checked={checkedState} /> */}
                            <div className='md:w-64 sm:w-56 w-full bg-white rounded-md h-80 sm:h-full overflow-y-scroll sm:overflow-auto scrollbar '>
                                <div className='grid grid-cols-1 gap-2 '>
                                    <p className='font-medium font-Rubik underline text-center sm:block hidden'>
                                        Pick Your Interest
                                    </p>
                                    <p className='font-medium font-Rubik text-center block sm:hidden text-lg my-2'>
                                        Change Interset
                                    </p>
                                    {titles &&
                                        titles.map((value, index) => {
                                            return (
                                                <Checkboxcomponent
                                                    key={index}
                                                    title={value}
                                                    name='types'
                                                    value={value}
                                                    checked={
                                                        checkedState[index]
                                                    }
                                                    onChange={
                                                        handleFilterChange
                                                    }
                                                    id={index}
                                                    afterChecked='flex items-center justify-center text-center sm:border-2 sm:border-black border-0 sm:bg-secondry-orange bg-white md:p-3 rounded h-16  font-Rubik font-medium sm:text-base text-xs'
                                                    beforeChecked='checked flex items-center justify-center text-center  sm:border-2 sm:border-black border-0 md:p-3 rounded h-16  font-Rubik font-medium sm:text-base text-xs'
                                                    view='sm:hidden'
                                                    block='sm:block'
                                                    flex='flex'
                                                    intrestMargin='ml-2'
                                                />
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
                <div className='sm:col-span-2 col-span-3'>
                    {paginatedPosts.map((event) => {
                        return (
                            <Link
                                key={event.id}
                                href={`/eventPage/${event.id}`}
                            >
                                <div className='sm:order-1 order-2'>
                                    <Eventcard
                                        key={event.id}
                                        eventImage={event.eventImage}
                                        eventDate={event.eventDate}
                                        eventDetails={event.description}
                                        eventTitle={event.title}
                                        eventAttendance={event.id}
                                        onClick={() => {
                                            joinEvent(event.id);
                                        }}
                                    />
                                </div>
                            </Link>
                        );
                    })}
                    <div className='md:order-2 order-1 text-center md:text-start'>
                        <Pagination
                            items={entries.length} // 100
                            currentPage={currentPage} // 1
                            pageSize={pageSize} // 10
                            onPageChange={onPageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Eventslist;
