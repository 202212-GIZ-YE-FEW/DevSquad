import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import Link from "next/link";
import { useTranslation } from "next-i18next";
// import { useRouter } from "next/router"; // Importing useRouter hook from next
import React, { useEffect, useState } from "react";

import Gmap from "@/components/Gmap/index";

import Alertcomponent from "../Alertcomponent";
import Buttoncomponent from "../Buttoncomponent";
import Checkboxcomponent from "../Checkboxcomponent";
import Inputcomponent from "../Inputcomponent";
import { types } from "../../utils/types";
import { auth, db, storage } from "../../../config/firebase";
export default function Eventcreation() {
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

    const myAlert = () => {
        setShowAlert(true);
        setAlertMessage(t("alert.eventCreation.eventSuccess"));
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

    // Get a reference to the "events" collection in Firestore
    const eventCollectionRef = collection(db, "events");

    // Initialize form state
    const [formData, setFormData] = useState({
        location: "",
        city: "City", // Default city value
        country: "",
        title: "",
        description: "",
        date: "",
        time: "",
        typeList: [], // An array to hold selected event types
        fileUpload: null, // Uploaded file (event image)
    });

    //Initialize error state
    const [showError, setShowError] = useState({
        location: false,
        title: false,
        description: false,
        date: false,
        time: false,
        typeList: false,
        fileUpload: false,
    });

    //the error message
    const erroreMessage = (message) => {
        return (
            <div className='flex items-center'>
                <div className='bg-red-500 rounded-full flex items-center justify-center h-2 w-2 p-2 mr-2'>
                    <span className='text-white font-bold text-xs'>!</span>
                </div>
                <span className='text-red-500'>{message}</span>
            </div>
        );
    };
    //hundle submit to validate the form data
    const handleSubmit = (e) => {
        const myobj = {
            location: false,
            title: false,
            description: false,
            date: false,
            time: false,
            typeList: false,
            fileUpload: false,
        };
        e.preventDefault();
        let error = false;

        // Check if each field is empty
        if (!formData.location || formData.location == "") {
            myobj.location = true;
            error = true;
        }
        if (!formData.title) {
            myobj.title = true;
            error = true;
        }
        if (!formData.description) {
            myobj.description = true;
            error = true;
        }
        if (!formData.date) {
            myobj.date = true;
            error = true;
        }
        if (!formData.time) {
            myobj.time = true;
            error = true;
        }
        if (!formData.fileUpload) {
            myobj.fileUpload = true;
            error = true;
        } else {
            if (!formData.fileUpload.type.startsWith("image/")) {
                myobj.fileUpload = true;
                error = true;
            }
        }

        if (formData.typeList.length === 0) {
            myobj.typeList = true;
            error = true;
        }

        if (error) {
            setShowError(myobj);
        }
        // If there is an error, stop submitting the form
        if (error) return;

        // Otherwise, submit the form
        uploadFile();
    };

    // Handle location change callback from Google Maps component
    const handleLocationChange = (locationInfo) => {
        setFormData({
            ...formData,
            location: locationInfo.location,
            city: locationInfo.city,
            country: locationInfo.country,
        });
    };

    // State for the checkbox group
    // Initialize checkbox state with default false values
    const [checkedState, setCheckedState] = useState(
        new Array(types.length).fill(false)
    );

    // Handle checkbox change callback
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        let x = [];

        // Create a list of selected event types
        const typeList = updatedCheckedState.map((item, index) => {
            if (item === true) {
                x.push(types[index]);
            }
        });

        // Update form data with selected event types
        setFormData({ ...formData, typeList: x });
    };

    // Upload event image to Firebase Storage
    const uploadFile = async () => {
        if (!formData.fileUpload) return;
        // Get file name
        const fileName = getFileName(formData.fileUpload.name);
        // Get a reference to the events folder in Storage
        const filesFolderRef = ref(storage, `eventsFolder/${fileName}`);
        try {
            // Upload file to Storage
            await uploadBytes(filesFolderRef, formData.fileUpload);
            // Submit event data to Firestore
            onSubmitEvent(fileName);
        } catch (err) {
            console.error(err);
        }
    };

    // Submit event data to Firestore
    const onSubmitEvent = async (fileName) => {
        try {
            // Add event data to Firestore
            await addDoc(eventCollectionRef, {
                title: formData.title,
                description: formData.description,
                location: formData.location,
                country: formData.country,
                city: formData.city,
                types: formData.typeList,
                eventDate: formData.date,
                eventTime: formData.time,
                eventImage: fileName,
                userId: auth?.currentUser?.uid,
            });
            // Alert user that the event was created successfully
            myAlert();
        } catch (err) {
            console.error(err);
        }
    };

    // Get file name with timestamp prefix
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

    // Initialize modal state
    const [showModal, setShowModal] = useState(false);

    return (
        <div className=' container mx-auto md:px-32 px-10 pt-12	pb-4 font-Rubik'>
            {/* choose event section */}
            <div className=' grid md:grid-cols-2 gap-14  grid-cols-1 mb-4 '>
                <div>
                    <p className='font-medium py-5'>
                        {t("eventcreation.chooseLocation")}
                    </p>
                    <p className=' text-primary-gray pb-7'>
                        {t("eventcreation.locationDescription")}
                    </p>

                    <Inputcomponent
                        type='text'
                        id='eventLocation'
                        name='eventLocation'
                        value={formData.location}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                location: e.target.value,
                            })
                        }
                        className='md:w-80 w-64	 h-12 border border-black rounded placeholder:p-2 px-2'
                        placeholder={t("eventcreation.locationPlaceholder")}
                    />
                    {showError.location &&
                        erroreMessage(t("alert.eventCreation.enterEvent"))}
                </div>
                <div className='pt-11	'>
                    <p className='text-7xl font-medium'>{formData.city}</p>
                    <>
                        <button
                            className='cursor-pointer text-blue-600'
                            type='button'
                            onClick={() => setShowModal(true)}
                        >
                            {t("eventcreation.changeLocation")}
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
                                                    {t(
                                                        "eventcreation.chooseyourLocation"
                                                    )}
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
                                                        locationInfo={
                                                            handleLocationChange
                                                        }
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
                                                    {t("eventcreation.close")}
                                                </button>
                                                <button
                                                    className='bg-orange-400 text-white active:bg-orange-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                                    type='button'
                                                    onClick={() =>
                                                        setShowModal(false)
                                                    }
                                                >
                                                    {t(
                                                        "eventcreation.saveChange"
                                                    )}
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
                <p className='font-medium py-5 text-3xl'>
                    {" "}
                    {t("eventcreation.EventType.eventTypeTitle")}
                </p>
                <p className='text-primary-gray pb-7'>
                    {t("eventcreation.EventType.EventTypeDescription")}
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
                {showError.typeList &&
                    erroreMessage(t("alert.eventCreation.SelectEvent"))}
            </div>
            {/* Event Title section */}
            <div>
                <p className='font-medium py-5 text-3xl'>
                    {" "}
                    {t("eventcreation.CreateEventInfo.eventTitle")}
                </p>
                <p className='text-primary-gray pb-7'>
                    {t("eventcreation.CreateEventInfo.eventTitleDescription")}
                </p>
                <Inputcomponent
                    type='text'
                    id='eventTitle'
                    name='eventTitle'
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                    className='w-full	 h-12 border border-black rounded px-2'
                    placeholder=''
                />
                {showError.title &&
                    erroreMessage(t("alert.eventCreation.enterEventTitle"))}
            </div>
            {/* Event date section */}
            <div>
                <p className='font-medium py-5 text-3xl'>
                    {" "}
                    {t("eventcreation.CreateEventInfo.eventDate")}
                </p>
                <p className='text-primary-gray pb-7'>
                    {t("eventcreation.CreateEventInfo.ChooseEventDate")}
                </p>
                <Inputcomponent
                    type='date'
                    id='eventDate'
                    name='eventDate'
                    className='w-80	 h-12 border border-black rounded'
                    placeholder={t(
                        "eventcreation.CreateEventInfo.eventTitlePlaceholder"
                    )}
                    value={formData.date}
                    onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                    }
                />
                {showError.date &&
                    erroreMessage(t("alert.eventCreation.enterEventDate"))}
            </div>
            {/* Event time section */}
            <div>
                <p className='font-medium py-5 text-3xl'>
                    {t("eventcreation.CreateEventInfo.eventTime")}
                </p>
                <p className='text-primary-gray pb-7'>
                    {t("eventcreation.CreateEventInfo.ChooseEventTime")}
                </p>
                <Inputcomponent
                    type='time'
                    id='eventtime'
                    name='eventtime'
                    className='w-80	 h-12 border border-black rounded px-2'
                    placeholder=''
                    value={formData.time}
                    onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                    }
                />
                {showError.time &&
                    erroreMessage(t("alert.eventCreation.enterEventTime"))}
            </div>
            {/* Event describtion section */}
            <div>
                <p className='font-medium py-5 text-3xl'>
                    {t("eventcreation.CreateEventInfo.eventDescriptionHeading")}
                </p>
                <p className='text-primary-gray pb-7'>
                    {t("eventcreation.CreateEventInfo.eventDescriptionText")}
                </p>
                <textarea
                    placeholder={t(
                        "eventcreation.CreateEventInfo.eventDescriptionPlaceholder"
                    )}
                    id='dateLocation'
                    name='dateLocation'
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                    className='w-full	 h-44 border border-black rounded  placeholder:text-primary-gray p-2'
                />
                {showError.description &&
                    erroreMessage(t("alert.eventCreation.enterEventdesc"))}
            </div>
            {/* Event image section */}
            <div>
                <p className='font-medium py-5 text-3xl'>
                    {t("eventcreation.CreateEventInfo.eventImageHeading")}
                </p>
                <p className='text-primary-gray pb-7'>
                    {t("eventcreation.CreateEventInfo.eventImageText")}
                </p>
                <Inputcomponent
                    type='file'
                    id='eventImage'
                    name='eventImage'
                    className='md:w-96 w-60	 h-12 border border-black rounded file:h-12'
                    placeholder=''
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            fileUpload: e.target.files[0],
                        })
                    }
                    // onChange={(e) => console.log(e.target.files[0])}
                />
                {showError.fileUpload &&
                    erroreMessage(t("alert.eventCreation.uploadImage"))}
            </div>
            {/* done section */}
            <div>
                <p className='font-medium py-3 text-3xl'>
                    {t("eventcreation.Guidelines.guidelinesHeading")}
                </p>
                <ul className='list-disc'>
                    <p className='text-primary-gray py-2'>
                        {t("eventcreation.Guidelines.guidelinesText")}
                    </p>
                    <li className='font-normal'>
                        {t("eventcreation.Guidelines.list1")}
                    </li>
                    <li className='font-normal'>
                        {t("eventcreation.Guidelines.list2")}
                    </li>
                    <li className='font-normal'>
                        {t("eventcreation.Guidelines.list3")}
                    </li>
                </ul>

                <p className='text-primary-gray'>
                    {t("eventcreation.Guidelines.guidelinesCommunity")}
                    <Link href='#' className='text-blue-600'>
                        {t("eventcreation.Guidelines.guidelinesLink")}
                    </Link>
                </p>
                <div className='py-20 flex flex-col items-center justify-center text-center'>
                    <Buttoncomponent
                        label={t("eventcreation.Guidelines.submitButton")}
                        hoverEffect='relative hover:bg-gradient-to-r  hover:ring-2 hover:ring-offset-2 hover:ring-black transition-all ease-out duration-300'
                        width='md:w-96 w-80'
                        height='h-12'
                        border='border border-b-2 border-r-2'
                        borderColor='border-black'
                        borderRaduis='rounded'
                        id='done'
                        onClick={handleSubmit}
                    />
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
