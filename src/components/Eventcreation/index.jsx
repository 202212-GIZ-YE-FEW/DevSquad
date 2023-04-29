import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import Link from "next/link";
// import { useRouter } from "next/router"; // Importing useRouter hook from next
import React, { useState } from "react";

import Gmap from "@/components/Gmap/index";

import Buttoncomponent from "../Buttoncomponent";
import Checkboxcomponent from "../Checkboxcomponent";
import Inputcomponent from "../Inputcomponent";
import { types } from "../../utils/types";
import { auth, db, storage } from "../../../config/firebase";
export default function Eventcreation() {
    //form states
    const [location, setLocation] = useState("");
    const [city, setCity] = useState("Izmer");
    const [country, setCountry] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventTypeList, setEventTypeList] = useState([]);
    // File Upload State
    const [fileUpload, setFileUpload] = useState(null);

    const eventCollectionRef = collection(db, "events");
    const getLocation = (param) => {
        setLocation(param);
    };

    const getCity = (param) => {
        setCity(param);
    };

    const getCountry = (param) => {
        setCountry(param);
    };
    const [checkedState, setCheckedState] = useState(
        new Array(types.length).fill(false)
    );

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        let x = [];

        const typeList = updatedCheckedState.map((item, index) => {
            if (item === true) {
                x.push(types[index]);
            }
        });

        setEventTypeList(x);
    };

    const uploadFile = async () => {
        if (!fileUpload) return;
        const fileName = getFileName(fileUpload.name);
        const filesFolderRef = ref(storage, `eventsFolder/${fileName}`);
        try {
            await uploadBytes(filesFolderRef, fileUpload);
            onSubmitEvent(fileName);
        } catch (err) {
            console.error(err);
        }
    };

    const onSubmitEvent = async (fileName) => {
        try {
            await addDoc(eventCollectionRef, {
                title: title,
                description: desc,
                location: location,
                country: country,
                city: city,
                types: eventTypeList,
                eventDate: eventDate,
                eventTime: eventTime,
                eventImage: fileName,
                userId: auth?.currentUser?.uid,
            });
            alert("The event was created successfully !");
        } catch (err) {
            console.error(err);
        }
    };

    const getFileName = (fileName) => {
        let currentdate = new Date();
        let datetime =
            currentdate.getDate() +
            "-" +
            (currentdate.getMonth() + 1) +
            "-" +
            currentdate.getFullYear() +
            "@" +
            currentdate.getHours() +
            "-" +
            currentdate.getMinutes() +
            "-" +
            currentdate.getSeconds() +
            "-" +
            currentdate.getMilliseconds();
        datetime += fileName;
        return datetime;
    };
    const [showModal, setShowModal] = useState(false);
    return (
        <div className=' container mx-auto md:px-32 px-10 pt-12	pb-4 font-Rubik'>
            {/* choose event section */}
            <div className=' grid md:grid-cols-2 gap-14  grid-cols-1 mb-4 '>
                <div>
                    <p className='font-medium py-5'>Choose Location</p>
                    <p className=' text-primary-gray pb-7'>
                        Pebble Events can be both local or online Choose where
                        you want to host your event.
                    </p>

                    <Inputcomponent
                        type='text'
                        id='eventLocation'
                        name='eventLocation'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className='w-80	 h-12 border border-black rounded placeholder:p-2'
                        placeholder='city'
                    />
                </div>
                <div className='pt-11	'>
                    <p className='text-7xl font-medium'>{city}</p>
                    {/* <Link href='#' className='cursor-pointer text-blue-600'>
                        choose location
                    </Link> */}
                    <>
                        <button
                            className='cursor-pointer text-blue-600'
                            type='button'
                            onClick={() => setShowModal(true)}
                        >
                            choose location
                        </button>
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
                                                    <Gmap
                                                        loc={getLocation}
                                                        city={getCity}
                                                        country={getCountry}
                                                    />
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
                    </>
                </div>
            </div>
            {/* Choose Event Type section */}
            <div>
                <p className='font-medium py-5 text-3xl'>Choose Event Type</p>
                <p className='text-primary-gray pb-7'>
                    Every Pebble events should serve at least one of th
                    sustainable devlopment goals of United Nations. whitch goal
                    do you want to help in ? Sellect all thet apply
                </p>
                <div className=' grid md:grid-cols-4 gap-4  grid-cols-2 mb-4 '>
                    {types &&
                        types.map((value, index) => {
                            return (
                                <Checkboxcomponent
                                    key={index}
                                    title={value}
                                    value={value}
                                    name={value}
                                    checked={checkedState[index]}
                                    onChange={() => handleOnChange(index)}
                                    afterChecked='flex items-center justify-center text-primary-orange text-center border border-primary-orange text-white bg-primary-orange p-3 rounded h-32 font-Rubik font-medium sm:text-base text-xs'
                                    beforeChecked='checked flex items-center justify-center text-center text-primary-orange border border-primary-orange p-3 rounded h-32 font-Rubik font-medium sm:text-base text-xs'
                                    view='hidden'
                                />
                            );
                        })}
                </div>
            </div>
            {/* Event Title section */}
            <div>
                <p className='font-medium py-5 text-3xl'>Event Title:</p>
                <p className='text-primary-gray pb-7'>
                    Choose a title that will give people a clear idea of what
                    the event is about. Feel free to be creative! You can edit
                    this later if you change your mind.
                </p>
                <Inputcomponent
                    type='text'
                    id='eventTitle'
                    name='eventTitle'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full	 h-12 border border-black rounded'
                    placeholder=''
                />
            </div>
            {/* Event date section */}
            <div>
                <p className='font-medium py-5 text-3xl'>Event Date:</p>
                <p className='text-primary-gray pb-7'>Choose a Event date</p>
                <Inputcomponent
                    type='date'
                    id='eventDate'
                    name='eventDate'
                    className='w-80	 h-12 border border-black rounded'
                    placeholder=''
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                />
            </div>
            {/* Event time section */}
            <div>
                <p className='font-medium py-5 text-3xl'>Event Time:</p>
                <p className='text-primary-gray pb-7'>Choose a Event Time</p>
                <Inputcomponent
                    type='time'
                    id='eventtime'
                    name='eventtime'
                    className='w-80	 h-12 border border-black rounded'
                    placeholder=''
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                />
            </div>
            {/* Event describtion section */}
            <div>
                <p className='font-medium py-5 text-3xl'>Event description:</p>
                <p className='text-primary-gray pb-7'>
                    Describe the purpose of your event. Who should join and what
                    will you do at the event?
                </p>
                <textarea
                    placeholder='Please write at least 50 characters'
                    id='dateLocation'
                    name='dateLocation'
                    onChange={(e) => setDesc(e.target.value)}
                    className='w-full	 h-44 border border-black rounded placeholder:p-2 placeholder:text-black'
                />
            </div>
            {/* Event image section */}
            <div>
                <p className='font-medium py-5 text-3xl'>Event Image:</p>
                <p className='text-primary-gray pb-7'>
                    We have found that listings with a photo attract more
                    interest.
                </p>
                <Inputcomponent
                    type='file'
                    id='eventImage'
                    name='eventImage'
                    className='md:w-96 w-60	 h-12 border border-black rounded file:h-12'
                    placeholder=''
                    onChange={(e) => setFileUpload(e.target.files[0])}
                />
            </div>
            {/* done section */}
            <div>
                <p className='font-medium py-3 text-3xl'>
                    Almost Done! Just take a minute to review our guidlines.
                </p>
                <ul className='list-disc'>
                    <p className='text-primary-gray py-2'>
                        Pebble is all about helping people with the help of
                        volunteers like you. This means that all events should:
                    </p>
                    <li className='font-normal'>
                        Be transparent about the event’s intentions.
                    </li>
                    <li className='font-normal'>
                        Encourage real human interactions in person or online.
                    </li>
                    <li className='font-normal'>
                        Have the host present in all events.
                    </li>
                </ul>

                <p className='text-primary-gray'>
                    You can read more about all of this in our
                    <Link href='#' className='text-blue-600'>
                        Community Guidelines
                    </Link>
                </p>
                <div className='py-20 flex flex-col items-center justify-center text-center'>
                    <Buttoncomponent
                        label='Agree with tearms and create Event!'
                        width='md:w-96'
                        height='h-12'
                        border='border border-b-2 border-r-2'
                        borderColor='border-black'
                        borderRaduis='rounded'
                        id='done'
                        onClick={uploadFile}
                    />
                </div>
            </div>
        </div>
    );
}
