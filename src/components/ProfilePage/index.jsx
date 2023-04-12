import React from "react";
import Buttoncomponent from "../Buttoncomponent";
import Checkboxcomponent from "../Checkboxcomponent";
import Inputcomponent from "../Inputcomponent";
import { updatePassword, updateProfile, getAuth } from "firebase/auth";
import { auth, storage, db } from "../../../config/firebase";
import { useEffect, useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    query,
    where,
} from "firebase/firestore";
import EventImage from "../../components/EventImage/index";
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
    const [isAuth, setIsAuth] = useState(null);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        user ? setIsAuth(auth?.currentUser?.uid) : setIsAuth(null);
    });
    const [img, setImg] = useState("");
    const [newName, setNewName] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [checkedState, setCheckedState] = useState(
        new Array(titles.length).fill(true)
    );
    const [intersetList, setIntersetList] = useState([]);
    const [fileUpload, setFileUpload] = useState(null);
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const [error, setError] = useState(null);

    const restPassword = async () => {
        if (passwordOne === passwordTwo) {
            updatePassword(auth.currentUser, passwordTwo).then(
                () => {
                    console.log("done");
                    alert("done");
                },
                (error) => {
                    setError(error);
                }
            );
        } else {
            setError("Password is not match");
        }
    };

    const updateUser = async (id) => {
        const eventDoc = doc(db, "users", id);
        await updateDoc(eventDoc, {
            name: newName,
            location: newLocation,
            intersets: intersetList,
            image: fileUpload.name,
        });
        uploadFile();
        alert("update profile successsfully");
    };

    const updateUserInfo = async () => {
        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("uid", "==", isAuth));
        const data = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        updateUser(filteredData[0].id);
    };

    const showImg = async () => {
        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("uid", "==", isAuth));
        const data = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        setImg(filteredData[0]?.image);
        console.log(isAuth);
    };
    useEffect(() => {
        setIsAuth(auth?.currentUser?.uid);
        showImg();
    }, []);

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        let x = [];

        const interstList = updatedCheckedState.map((item, index) => {
            if (item === true) {
                x.push(titles[index]);
            }
        });

        setIntersetList(x);
    };

    const uploadFile = async () => {
        if (!fileUpload) return;
        // const fileName = getFileName(fileUpload.name);
        const filesFolderRef = ref(storage, `eventsFolder/${fileUpload.name}`);
        try {
            await uploadBytes(filesFolderRef, fileUpload);
            // onSubmitEvent(fileName);
        } catch (err) {
            console.error(err);
        }
    };

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
                                {auth.currentUser?.email[0]}{" "}
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
                            // uploadFile();
                            showImg();
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

                    <input
                        type='file'
                        onChange={(e) => setFileUpload(e.target.files[0])}
                        accept='image/x-png,image/gif,image/jpeg'
                    />
                </div>
            </div>

            <div className='flex flex-col w-5/6 space-y-4'>
                <div className='flex flex-col'>
                    <label className='text-xl font-Rubik font-medium tracking-wide'>
                        Name (Required)
                    </label>
                    <Inputcomponent
                        type='text'
                        placeholder='Name'
                        className='border border-black rounded p-3 md:w-3/6 mt-2 mb-2'
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='text-xl font-Rubik font-medium tracking-wide'>
                        Your Location
                    </label>
                    <Inputcomponent
                        type='text'
                        placeholder='Location'
                        className='border border-black rounded p-3 md:w-3/6 mt-2 mb-2'
                        onChange={(e) => setNewLocation(e.target.value)}
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
                    {/* {titles &&
                        titles.map((title) => {
                            return (
                                <Checkboxcomponent
                                    key={title}
                                    title={title}
                                    checked={true}
                                    textColor='text-black'
                                    textColorChecked='text-black'
                                    borderColor='border-black'
                                    borderRightAndDown='border-r-2 border-b-2'
                                    height='h-20'
                                />
                            );
                        })} */}
                    {titles &&
                        titles.map((title, index) => {
                            return (
                                <Checkboxcomponent
                                    key={title}
                                    title={title}
                                    checked={checkedState[index]}
                                    textColor='text-black'
                                    textColorChecked='text-black'
                                    borderColor='border-black'
                                    borderRightAndDown='border-r-2 border-b-2'
                                    height='h-20'
                                    onChange={() => handleOnChange(index)}
                                />
                            );
                        })}
                </div>
                <div>{intersetList}</div>
                <div className='flex flex-row sm:justify-end justify-center sm:m-6 m-2'>
                    <Buttoncomponent
                        bgColor='bg-orange-400'
                        borderRaduis='rounded'
                        width='w-40'
                        height='h-14'
                        textColor='text-white'
                        label='Save Changes'
                        fontSize='text-xl'
                        onClick={updateUserInfo}
                    />
                </div>
            </div>
            {/* //---------------------------------------------------------------------------------------- */}
            <div className='flex flex-col items-center bg-slate-300 rounded-lg sm:p-7 p-1'>
                <div className='flex flex-row sm:justify-start justify-center mb-3 mt-2 sm:mt-0 sm:w-full'>
                    <h1 className='text-2xl font-Rubik font-medium'>
                        Change Password {error}
                    </h1>
                </div>

                <div className='flex justify-center flex-col sm:flex-row'>
                    <Inputcomponent
                        type='password'
                        placeholder='Password'
                        className='border border-black rounded p-3 w-48 m-4'
                        onChange={(e) => setPasswordOne(e.target.value)}
                    />
                    <Inputcomponent
                        type='password'
                        placeholder='Retype Password'
                        className='border border-black rounded p-3 w-48 m-4'
                        onChange={(e) => setPasswordTwo(e.target.value)}
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
                    />
                </div>
            </div>
        </div>
    );
}
