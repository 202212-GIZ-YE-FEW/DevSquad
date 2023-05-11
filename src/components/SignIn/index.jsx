"use client";

import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth"; // Importing necessary functions from firebase/auth
// Importing necessary functions from firebase/firestore
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router"; // Importing useRouter hook from next
import { useTranslation } from "next-i18next";
import React, { useState } from "react"; // Importing React and useState

import Buttoncomponent from "../Buttoncomponent";
import Inputcomponent from "../Inputcomponent";
import {
    auth,
    googleProvider,
    twitterProvider,
} from "../../../config/firebase"; // Importing Firebase configurations and providers
import google from "../../../public/images/google.png";
import sitting from "../../../public/images/Sitting.png";
import twitter from "../../../public/images/twitter.png";

export default function SignIn() {
    const { t } = useTranslation("common");

    const router = useRouter(); // Getting the router instance

    // Listening to authentication state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // If the user is authenticated
            router.push("/"); // Redirect to homepage
        }
    });
    // Setting up form states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [validationMessage, setValidationMessage] = useState(null);
    const { i18n } = useTranslation();

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

    // Handling sign in with Google
    const signInWithGoogle = async () => {
        try {
            setError(null);
            await signInWithPopup(auth, googleProvider);
            router.push("/");
        } catch (err) {
            setError(err.message);
        }
    };

    // Handling sign in form submission
    const signIn = async (event) => {
        setError(null); // Resetting the error state
        setValidationMessage(null); // Resetting the error state

        if (!email && !password) {
            setValidationMessage("Enter correct email and password");
        }

        if (!email || !password) {
            setValidationMessage("Invalid login or password. Please try again");
        }
        // user sign in with the email and password
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                router.push("/"); // Redirect to homepage after user sign in
            })
            .catch((error) => {
                // If an error occurred
                setError(error.message); // Set the error state with the error message
            });
        event.preventDefault();
    };
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
    return (
        // using grid layout to divide the page
        <div className='grid grid-cols-1 place-items-center md:grid-cols-2'>
            {/* sitting image part */}
            <div className='grid justify-items-center'>
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
                        {t("signin.signIn")}
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
                                {t("signin.signWithTwitter")}
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
                                {t("signin.signWithGoogle")}
                            </span>
                        </button>
                    </div>

                    {/* component two */}
                    <div className='items-center hidden sm:inline-flex'>
                        <hr className='w-48 h-px my-8 bg-gray-300 border-0'></hr>
                        <span className='px-3 text-gray-500 bg-white'>
                            {t("signin.or")}
                        </span>
                        <hr className='w-48 h-px my-8 bg-gray-300 border-0'></hr>
                    </div>

                    {/* component three */}
                    <form className='grid grid-cols-1 gap-y-4'>
                        <Inputcomponent
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                            type='email'
                            id='email'
                            name='email'
                            className='border  rounded-md border-black py-1 px-2'
                            placeholder={t("signin.email")}
                        />
                        <Inputcomponent
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            value={password}
                            type='password'
                            id='password'
                            name='password'
                            className='border rounded-md border-black py-1 px-2 '
                            placeholder={t("signin.password")}
                        />
                        {error && (
                            <div className='text-red-500 text-center'>
                                {validationMessage
                                    ? erroreMessage(validationMessage)
                                    : erroreMessage(error)}
                            </div>
                        )}

                        <p className='text-sm hidden sm:block'>
                            {t("signin.haveAccount")}
                            <Link
                                href='/signup'
                                className='md:underline text-orange-400 md:text-black'
                            >
                                {t("signin.signUp")}
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
                            label={t("signin.signIn")}
                            onClick={signIn}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
