import { updatePassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import React from "react";
import { useEffect, useState } from "react";

import Alertcomponent from "../Alertcomponent";
import Buttoncomponent from "../Buttoncomponent";
import Checkboxcomponent from "../Checkboxcomponent";
import Inputcomponent from "../Inputcomponent";
import EventImage from "../../components/EventImage/index";
import { auth, db, storage } from "../../../config/firebase";

export default function ProfilePage() {
    const titles = [
        "No Poverty",
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
        "Life Below Water",
        "Life On Land",
        "Peace And Justice And Strong Institutions",
    ];

    const [img, setImg] = useState("");

    const [message, setMessage] = useState(null);
    const [newName, setNewName] = useState("");
    const [checkName, setCheckName] = useState(null);
    const [newLocation, setNewLocation] = useState("");
    // make all the checkboxes (titles) false
    const [checkedState, setCheckedState] = useState(
        new Array(titles.length).fill(false)
    );
    const [intersetList, setIntersetList] = useState([]);
    const [fileUpload, setFileUpload] = useState(null);
    const [checkFileUpload, setCheckFileUpload] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
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

    //rest password
    const restPassword = async () => {
        if (!passwordOne || !passwordTwo) {
            setMessage("Enter correct password");
        } else {
            if (passwordOne === passwordTwo) {
                // get the currentUser and change its passowrd using updatePassword from firebase/auth
                updatePassword(auth.currentUser, passwordTwo).then(
                    () => {
                        // console.log("done");
                        // alert("update password successfully");
                        setMessage(null);
                        setShowAlert(true);
                        setAlertMessage("update password successfully");
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
                    },
                    (error) => {
                        setMessage(error);
                    }
                );
            } else {
                setMessage("Password is not match");
            }
        }
    };

    //Cancel Button
    const clear = async () => {
        if (passwordOne || passwordTwo) {
            setMessage(null);
            setPasswordOne(null);
            setPasswordTwo(null);
            setShowAlert(true);
            setAlertMessage("Cancel update password");
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
        }

        message ? setMessage(null) : "";
    };

    const updateUserInfo = async (id) => {
        if (!newName) {
            setCheckName("Name is required");
        } else {
            // go the user collection and use the doc id go the spesific doc and update the data
            const userDoc = doc(db, "users", id);

            await updateDoc(userDoc, {
                // if the user did not change the name user the current name
                name: newName ? newName : auth?.currentUser?.displayName,
                location: newLocation,
                intersets: intersetList,
                // if the user did not change the image use the name to get the first letter of the name
                image: fileUpload ? fileUpload?.name : img,
            });
            setCheckName(null);
            setShowAlert(true);
            setAlertMessage("Update profile successsfully");
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
        }
    };

    const updateuser = async () => {
        // go to db and get all info of users collection
        const usersCollectionRef = collection(db, "users");
        // get the info where the user id equal to current user id
        const q = query(
            usersCollectionRef,
            where("uid", "==", auth.currentUser.uid)
        );
        // get docs for that specific user
        const data = await getDocs(q);
        // get the id and info
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        // send the id to updateUserInfo function of the doc to update the user info
        updateUserInfo(filteredData[0]?.id);
    };

    const showImg = async () => {
        // get the collection of users
        const usersCollectionRef = collection(db, "users");
        // get the user info where the id equal the current user id
        const q = query(
            usersCollectionRef,
            where("uid", "==", auth?.currentUser?.uid)
        );
        // get the doc of that user
        const data = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        // get the image in the db if there is an image
        setImg(filteredData[0]?.image);
    };

    const handleOnChange = (position) => {
        // get all the titles with thier state
        const updatedCheckedState = checkedState.map((item, index) =>
            // if index equal the spesific position change the state
            index === position ? !item : item
        );
        // add all the titles that have a true state to checkedState using setCheckedState
        setCheckedState(updatedCheckedState);
        let x = [];

        // add all the true items to x for stroing interset in db
        updatedCheckedState.map((item, index) => {
            if (item === true) {
                x.push(titles[index]);
            }
        });

        setIntersetList(x);
    };

    const uploadFile = async () => {
        // if there is no file return null
        if (!fileUpload) return;
        if (!fileUpload.type.startsWith("image/")) {
            setCheckFileUpload("Please upload only image.");
        }
        const filesFolderRef = ref(storage, `eventsFolder/${fileUpload.name}`);
        try {
            // add the location where the image is to be upload
            await uploadBytes(filesFolderRef, fileUpload);
            // alert("file uploaded!");
            setCheckFileUpload(null);
            setShowAlert(true);
            setAlertMessage("image uploaded successguly");
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

    //the error message
    const erroreMessage = (messageValidation) => {
        return (
            <div className='flex items-center'>
                {messageValidation ? (
                    <div className='bg-red-500 rounded-full flex items-center justify-center h-2 w-2 p-2 mr-2'>
                        <span className='text-white font-bold text-xs'>!</span>
                    </div>
                ) : (
                    ""
                )}
                <span className='text-red-500'>{messageValidation}</span>
            </div>
        );
    };

    useEffect(() => {
        // if the user auth add the user image
        onAuthStateChanged(auth, (user) => {
            user ? showImg() : "";
        });
    }, [img]);

    return (
        <div className='flex flex-col justify-center items-center space-y-10 mt-8 mb-8'>
            <div className='flex flex-col sm:m-0 m-2 md:w-5/6'>
                <div className='flex flex-row sm:justify-start justify-center'>
                    <h1 className='text-2xl font-Rubik font-medium tracking-wide'>
                        Edit Profile
                    </h1>
                </div>
                <div className='mt-2 mb-2 sm:space-x-3 space-y-3'>
                    <div class=' inline-flex items-center justify-center w-32 h-32 bg-black rounded-full'>
                        {img ? (
                            <EventImage
                                pic={img}
                                className='inline-flex  w-36 h-36 bg-black rounded-full'
                            />
                        ) : (
                            // if there is no image get the first letter in the email
                            <span class='text-4xl text-white'>
                                {auth.currentUser?.email[0]}
                            </span>
                        )}
                    </div>
                    <Buttoncomponent
                        bgColor='bg-orange-400'
                        borderRaduis='rounded'
                        width='w-40'
                        height='h-14'
                        textColor='text-white'
                        label='Uplaod New'
                        fontSize='text-xl'
                        onClick={() => {
                            uploadFile();
                        }}
                    />

                    <Inputcomponent
                        type='file'
                        onChange={(e) => setFileUpload(e.target.files[0])}
                        accept='image/x-png,image/gif,image/jpeg'
                        className='rounded sm:w-64 w-52 font-Rubik sm:text-xl border border-r-2 border-b-2 border-black font-medium'
                    />
                    {erroreMessage(checkFileUpload)}
                </div>
            </div>

            <div className='flex flex-col w-5/6 space-y-4'>
                <div className='flex flex-col'>
                    <label className='text-xl font-Rubik font-medium tracking-wide'>
                        Name (Required)
                    </label>
                    <Inputcomponent
                        onChange={(event) => setNewName(event.target.value)}
                        value={newName}
                        type='text'
                        placeholder='Name'
                        className='border border-black rounded p-3 md:w-3/6 mt-2 mb-2'
                    />
                    {erroreMessage(checkName)}
                </div>
                <div className='flex flex-col'>
                    <label className='text-xl font-Rubik font-medium tracking-wide'>
                        Your Location
                    </label>
                    <Inputcomponent
                        onChange={(e) => setNewLocation(e.target.value)}
                        value={newLocation}
                        type='text'
                        placeholder='Location'
                        className='border border-black rounded p-3 md:w-3/6 mt-2 mb-2'
                    />
                </div>
            </div>
            <div className='sm:m-6 m-2'>
                <div className='flex flex-row sm:justify-start justify-center mb-3'>
                    <h1 className='text-2xl font-Rubik font-medium'>
                        Your Interests
                    </h1>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-4 sm:gap-x-8'>
                    {titles &&
                        titles.map((title, index) => {
                            return (
                                <Checkboxcomponent
                                    key={title}
                                    title={title}
                                    // send the index of the component to the function for storing interest
                                    onChange={() => handleOnChange(index)}
                                    // base in index the color
                                    checked={checkedState[index]}
                                    view='hidden'
                                    afterChecked='flex items-center justify-center text-center border bg-primary-orange p-3 rounded font-medium sm:text-base text-xs text-black border-black border-r-2 border-b-2 h-20'
                                    beforeChecked='checked flex items-center justify-center text-center  border p-3 rounded  font-medium sm:text-base text-xs text-black border-black border-r-2 border-b-2 h-20'
                                />
                            );
                        })}
                </div>
                {/* <div>{intersetList}</div> */}
                <div className='flex flex-row sm:justify-end justify-center sm:m-6 m-2'>
                    <Buttoncomponent
                        bgColor='bg-orange-400'
                        borderRaduis='rounded'
                        width='w-40'
                        height='h-14'
                        textColor='text-white'
                        label='Save Changes'
                        fontSize='text-xl'
                        onClick={updateuser}
                    />
                </div>
            </div>
            <div className='flex flex-col items-center bg-slate-300 rounded-lg sm:p-7 p-1'>
                <div className='flex flex-row sm:justify-start justify-center mb-3 mt-2 sm:mt-0 sm:w-full'>
                    <h1 className='text-2xl font-Rubik font-medium'>
                        Change Password{" "}
                        <div className='flex items-center'>
                            {message ? (
                                <div className='bg-red-500 rounded-full flex items-center justify-center h-2 w-2 p-2 mr-2'>
                                    <span className='text-white font-bold text-xs'>
                                        !
                                    </span>
                                </div>
                            ) : (
                                ""
                            )}
                            <span className='text-red-500'>{message}</span>
                        </div>
                    </h1>
                </div>

                <div className='flex justify-center flex-col sm:flex-row'>
                    <Inputcomponent
                        type='password'
                        placeholder='Password'
                        className='border border-black rounded p-3 w-48 m-4'
                        onChange={(e) => setPasswordOne(e.target.value)}
                        value={passwordOne}
                    />
                    <Inputcomponent
                        type='password'
                        placeholder='Retype Password'
                        className='border border-black rounded p-3 w-48 m-4'
                        onChange={(e) => setPasswordTwo(e.target.value)}
                        value={passwordTwo}
                    />
                </div>
                <div className='flex flex-col sm:flex-row sm:justify-end justify-center sm:m-6 m-2 sm:w-full'>
                    <Buttoncomponent
                        bgColor='bg-orange-400'
                        borderRaduis='rounded'
                        width='w-40'
                        height='h-14'
                        textColor='text-white'
                        label='Submit'
                        fontSize='text-xl'
                        onClick={() => {
                            restPassword();
                        }}
                    />
                    <Buttoncomponent
                        bgColor='bg-white'
                        borderRaduis='rounded'
                        width='w-40'
                        height='h-14'
                        label='Cancel'
                        fontSize='text-xl'
                        border='border border-r-2 border-b-2'
                        borderColor='border-black'
                        onClick={() => {
                            clear();
                        }}
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
