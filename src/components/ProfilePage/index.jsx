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

    //##
    // const router = useRouter(); // Getting the router instance
    // onAuthStateChanged(auth, (user) => {
    //     if (!user) {
    //         // If the user is authenticated
    //         router.push("/"); // Redirect to homepage
    //     }

    // });

    const [img, setImg] = useState("");
    const [error, setError] = useState(null);
    const [newName, setNewName] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [checkedState, setCheckedState] = useState(
        new Array(titles.length).fill(false)
    );
    const [intersetList, setIntersetList] = useState([]);
    const [fileUpload, setFileUpload] = useState(null);
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
        if (passwordOne === passwordTwo) {
            updatePassword(auth.currentUser, passwordTwo).then(
                () => {
                    // console.log("done");
                    // alert("update password successfully");
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
                    setError(error);
                }
            );
        } else {
            setError("password is not match");
        }
    };

    //Cancel Button
    const clear = async () => {
        setPasswordOne(null);
        setPasswordTwo(null);

        // console.log("done");
        // alert("cancel update password");
        setShowAlert(true);
        setAlertMessage("cancel update password");
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

    const updateUserInfo = async (id) => {
        const userDoc = doc(db, "users", id);

        await updateDoc(userDoc, {
            name: newName ? newName : auth?.currentUser?.displayName,
            location: newLocation,
            intersets: intersetList,
            image: fileUpload ? fileUpload?.name : img,
        });
        // uploadFile();
        alert("update profile successsfully");
    };

    const updateuser = async () => {
        const usersCollectionRef = collection(db, "users");
        const q = query(
            usersCollectionRef,
            where("uid", "==", auth.currentUser.uid)
        );
        const data = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        updateUserInfo(filteredData[0]?.id);
    };

    const showImg = async () => {
        const usersCollectionRef = collection(db, "users");
        const q = query(
            usersCollectionRef,
            where("uid", "==", auth?.currentUser?.uid)
        );
        const data = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        setImg(filteredData[0]?.image);
        // console.log(img);
    };

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        let x = [];

        updatedCheckedState.map((item, index) => {
            if (item === true) {
                x.push(titles[index]);
            }
        });

        setIntersetList(x);
    };

    const uploadFile = async () => {
        if (!fileUpload) return;

        const filesFolderRef = ref(storage, `eventsFolder/${fileUpload.name}`);
        try {
            await uploadBytes(filesFolderRef, fileUpload);
            alert("file uploaded!");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
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
                    <div class=' inline-flex items-center justify-center w-36 h-36 bg-black rounded-full'>
                        {img ? (
                            <EventImage
                                pic={img}
                                className='inline-flex  w-36 h-36 bg-black rounded-full'
                            />
                        ) : (
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
                            // showImg();
                        }}
                    />

                    {/* <Buttoncomponent
                        type="file"
                        borderRaduis='rounded'

                        width='sm:w-64 w-52'
                        height='h-14'
                        label='Choose from Library'
                        fontSize='sm:text-xl text-lg'
                        border='border border-r-2 border-b-2'
                        borderColor='border-black'
                        fontWeight='font-medium'
                    /> */}

                    <Inputcomponent
                        type='file'
                        onChange={(e) => setFileUpload(e.target.files[0])}
                        //value={fileUpload}
                        accept='image/x-png,image/gif,image/jpeg'
                        className='rounded sm:w-64 w-52 font-Rubik sm:text-xl border border-r-2 border-b-2 border-black font-medium'
                    />
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
                                    onChange={() => handleOnChange(index)}
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
                        <div className='text-red-500 text-center'>{error}</div>
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
