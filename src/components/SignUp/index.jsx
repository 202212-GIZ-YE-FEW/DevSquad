import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth"; // Importing necessary functions from firebase/auth
import { addDoc, collection } from "firebase/firestore"; // Importing necessary functions from firebase/firestore
import Image from "next/image"; // Importing Image component from next
import Link from "next/link";
import { useRouter } from "next/router"; // Importing useRouter hook from next
import { useTranslation } from "next-i18next";
import React, { useState } from "react"; // Importing React and useState

import Buttoncomponent from "../Buttoncomponent";
import Inputcomponent from "../Inputcomponent";
import {
    auth,
    db,
    googleProvider,
    twitterProvider,
} from "../../../config/firebase"; // Importing Firebase configurations and providers
import google from "../../../public/images/google.png";
import sitting from "../../../public/images/Sitting.png";
import twitter from "../../../public/images/twitter.png";
export default function SignUp() {
    // for translation
    const { t } = useTranslation("common");

    const router = useRouter(); // Getting the router instance
    // Setting up form states
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [error, setError] = useState(null);
    // fot the language direction
    const { i18n } = useTranslation();

    // Listening to authentication state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // If the user is authenticated
            router.push("/"); // Redirect to homepage
        }
    });

    // Handling sign up form submission
    const signUp = async (event) => {
        setError(null); // Resetting the error state
        if (passwordOne === passwordTwo)
            // If both password fields are the same
            // Create a new user with the email and password  and Add user data to users collection in Firestore
            createUserWithEmailAndPassword(auth, email, passwordOne)
                // because createUserWithEmailAndPassword function can only accept email and password we will use .then to
                // store the user name and surname
                .then(async (registeredUser) => {
                    await addDoc(collection(db, "users"), {
                        uid: registeredUser.user.uid,
                        name: name,
                        surname: surname,
                    });
                    router.push("/"); // Redirect to homepage after Create a new user
                })
                .catch((error) => {
                    // If an error occurred
                    setError(error.message); // Set the error state with the error message
                });
        else setError(t("alert.signup.matchPass")); // If passwords don't match, set the error state with a message
        event.preventDefault();
    };

    // Handling sign in with Twitter
    const signInWithTwitter = async () => {
        try {
            setError(null);
            await signInWithPopup(auth, twitterProvider);
            router.push("/");
        } catch (err) {
            setError(err.message);
        }
    };

    // Handling sign up with Google
    const signInWithGoogle = async () => {
        try {
            setError(null);
            await signInWithPopup(auth, googleProvider)
                //--------------------------------------------##
                .then(async (result) => {
                    // The signed-in user info.
                    const user = result.user;
                    await addDoc(collection(db, "users"), {
                        uid: user.uid,
                        name: user?.displayName,
                        surname: user.displayName,
                        image: user.photoURL,
                    });
                })
                .catch((error) => {
                    // If an error occurred
                    setError(error.message); // Set the error state with the error message
                });
            //---------------------------------------
            router.push("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='grid grid-cols-1 place-items-center md:grid-cols-2'>
            {/* sitting image part */}
            <div className='grid justify-items-center '>
                <Image
                    src={sitting}
                    alt='sitting'
                    className={`p-6 ${
                        i18n.language === "en" ? "" : "transform -scale-x-100"
                    }`}
                />
            </div>

            {/* form part */}
            <div className='grid grid-cols-1 gap-y-2 m-3 md:m-0'>
                <div className='my-2 md:my-8 flex justify-center md:justify-start'>
                    <h1 className='font-bold text-xl tracking-wide'>
                        {" "}
                        {t("signup.signUp")}
                    </h1>
                </div>

                {/* using flex box to reverse the component when it is mobile or tablet */}
                <div className='flex flex-col-reverse md:flex-col'>
                    {/* component one */}
                    <div className='grid grid-cols-1 gap-y-3'>
                        <button
                            onClick={signInWithTwitter}
                            className='border border-r-2 border-b-2 rounded-md border-black flex justify-center py-1'
                        >
                            <Image
                                src={twitter}
                                alt='Twitter'
                                className='w-5 pt-1'
                            />
                            <span className='pl-2'>
                                {t("signup.signWithTwitter")}
                            </span>
                        </button>
                        <button
                            onClick={signInWithGoogle}
                            className='border border-r-2 border-b-2 rounded-md border-black flex justify-center py-1'
                        >
                            <Image
                                src={google}
                                alt='Google'
                                className='w-5 pt-1'
                            />
                            <span className='pl-2'>
                                {t("signup.signWithGoogle")}
                            </span>
                        </button>
                    </div>

                    {/* component two */}
                    <div className='items-center hidden sm:inline-flex'>
                        <hr className='w-48 h-px my-8 bg-gray-300 border-0'></hr>
                        <span className='px-3 text-gray-500 bg-white'>
                            {t("signup.or")}
                        </span>
                        <hr className='w-48 h-px my-8 bg-gray-300 border-0'></hr>
                    </div>

                    {/* component three */}
                    <form className='grid grid-cols-1 gap-y-4'>
                        <div className='grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-2'>
                            <Inputcomponent
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                value={name}
                                type='text'
                                id='name'
                                name='name'
                                className='border  rounded-md border-black py-1 px-2 mb-2 sm:mb-0'
                                placeholder={t("signup.name")}
                            />
                            <Inputcomponent
                                onChange={(event) =>
                                    setSurname(event.target.value)
                                }
                                value={surname}
                                type='text'
                                id='Surname'
                                name='Surname'
                                className='border  rounded-md border-black py-1 px-2'
                                placeholder={t("signup.surname")}
                            />
                        </div>
                        <Inputcomponent
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                            type='email'
                            id='email'
                            name='email'
                            className='border  rounded-md border-black py-1 px-2'
                            placeholder={t("signup.email")}
                        />
                        <Inputcomponent
                            onChange={(event) =>
                                setPasswordOne(event.target.value)
                            }
                            value={passwordOne}
                            type='password'
                            id='password'
                            name='password'
                            className='border  rounded-md border-black py-1 px-2'
                            placeholder={t("signup.password")}
                        />
                        <Inputcomponent
                            onChange={(event) =>
                                setPasswordTwo(event.target.value)
                            }
                            value={passwordTwo}
                            type='password'
                            id='confirmpassword'
                            name='confirmpassword'
                            className='border  rounded-md border-black py-1 px-2'
                            placeholder={t("signup.confirmpassword")}
                        />
                        {error && (
                            <div className='text-red-500 text-center'>
                                {error}
                            </div>
                        )}
                        <p className='text-sm hidden sm:block'>
                            {t("signup.haveAccount")}{" "}
                            <Link
                                href='/signin'
                                className='md:underline text-orange-400 md:text-black '
                            >
                                {t("signup.signIn")}{" "}
                            </Link>
                        </p>
                        <Buttoncomponent
                            borderRaduis='rounded-md'
                            bgColor='bg-orange-400'
                            textColor='text-white'
                            hoverEffect='relative hover:bg-gradient-to-r hover:from-primary-orange hover:to-orange-200 hover:ring-2 hover:ring-offset-2 hover:ring-primary-orange transition-all ease-out duration-300'
                            width='md:w-24'
                            padding='py-1'
                            margin='mb-4'
                            label={t("signup.signUp")}
                            onClick={signUp}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
