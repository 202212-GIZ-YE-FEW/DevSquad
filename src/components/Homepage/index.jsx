import AOS from "aos";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

import "aos/dist/aos.css";

import Goalimage from "./Goalimage";
import Hirosection from "./Hirosection";
import HowitworkCard from "./HowitworkCard";
import VolunteerCard from "./VolunteerCard";
import Getstartedbtn from "../Getstartedbtn";
const Homepage = () => {
    const { t } = useTranslation("common");
    const { i18n } = useTranslation();
    const arrImage = [
        "/images/1.png",
        "/images/2.png",
        "/images/3.png",
        "/images/4.png",
        "/images/5.png",
        "/images/6.png",
        "/images/7.png",
        "/images/8.png",
        "/images/9.png",
        "/images/10.png",
        "/images/11.png",
        "/images/12.png",
        "/images/13.png",
        "/images/14.png",
        "/images/15.png",
        "/images/16.png",
        "/images/17.png",
        "/images/18.png",
    ];
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
            {/* hiro section */}
            <Hirosection />
            {/* how it work section */}
            <p className='text-4xl text-center py-16 font-Rubik font-medium '>
                {t("home.Howitwork")}
            </p>
            <div className='container mx-auto md:px-32 px-10 pt-12	pb-4 grid lg:grid-cols-3 gap-10 grid-cols-1 font-Rubik'>
                <HowitworkCard
                    title={t("home.Register")}
                    imageSrc='/images/ManTop.png'
                    describtion={t("home.RegisterDesc")}
                    linkWord={t("Navbar.SignUp")}
                    hreflink='/signup'
                />
                <HowitworkCard
                    title={t("home.Attendevevts")}
                    imageSrc='/images/attend.png'
                    describtion={t("home.AttendeDesc")}
                    linkWord={t("home.Viewevents")}
                    hreflink='/events'
                />
                <HowitworkCard
                    title={t("home.Organizeyourown")}
                    imageSrc='/images/Girl.png'
                    describtion={t("home.OrganizeyourownDesc")}
                    linkWord={t("home.GetStarted")}
                    hreflink='/signup'
                />
            </div>
            {/* goals dection */}
            <p className='text-4xl text-center pt-28 pb-5 font-Rubik font-medium'>
                {t("home.SustainableDevlopmentGoals")}
            </p>
            <p className='md:px-40 px-10  text-xl text-primary-gray text-center font-Rubik font-normal'>
                {t("home.goals")}
            </p>
            <div className='container mx-auto md:px-32 px-20 pt-12	pb-4 grid lg:grid-cols-6 gap-5 md:grid-cols-4 grid-cols-2 items-center font-Rubik'>
                <Goalimage arrImage={arrImage} />
            </div>
            {/* volunteer section */}
            <p className='text-4xl text-center pt-20 font-Rubik font-medium'>
                {t("home.Hearitfromvolunteers")}
            </p>
            <div className='container mx-auto  md:px-32 px-10 pt-12	pb-4 grid md:grid-cols-3 gap-10 grid-cols-1 font-Rubik'>
                <VolunteerCard
                    volunteerImage='/images/volunteer 1.png'
                    name={t("home.volunteersName1")}
                    voldescribtion={t("home.volunteersQu1")}
                />
                <VolunteerCard
                    volunteerImage='/images/volunteer 2.png'
                    name={t("home.volunteersName2")}
                    voldescribtion={t("home.volunteersQu2")}
                />
                <VolunteerCard
                    volunteerImage='/images/volunteer 3.png'
                    name={t("home.volunteersName3")}
                    voldescribtion={t("home.volunteersQu3")}
                />
            </div>
            {/* images section in home page */}
            <div className='container mx-auto md:px-32 px-10 pt-28 pb-10 grid grid-cols-2 text-center  '>
                <div className=''>
                    <div className='relative h-60 overflow-hidden '>
                        <Image
                            src='/images/home4.png'
                            alt='profile'
                            fill
                            className='object-cover rounded-3xl p-3'
                            data-aos='zoom-in-up'
                        />
                    </div>
                    <div className='relative h-80 overflow-hidden '>
                        <Image
                            src='/images/home1.png'
                            alt='profile'
                            fill
                            className='object-cover rounded-3xl p-3'
                            data-aos='zoom-in-up'
                        />
                    </div>
                </div>
                <div>
                    <div className='relative h-80 overflow-hidden '>
                        <Image
                            src='/images/home2.png'
                            alt='profile'
                            fill
                            className='object-cover rounded-3xl p-3'
                            data-aos='zoom-in-up'
                        />
                    </div>
                    <div className='relative h-60 overflow-hidden'>
                        <Image
                            src='/images/home3.png'
                            alt='profile'
                            fill
                            className='object-cover rounded-3xl p-3'
                            data-aos='zoom-in-up'
                        />
                    </div>
                </div>
            </div>
            {/* final section */}
            <p className='text-4xl text-center pt-24 pb-5 font-Rubik lg:px-96 md:px-52 px-10 font-medium'>
                {t("home.Becomethechangeyouwishtoseeintheworld")}
            </p>
            <p className='md:px-40 px-10 text-xl text-primary-gray text-center font-Rubik font-normal'>
                {t(
                    "home.Doeverythingyoucantocreateanamazing,inspiring experienceintheworld"
                )}
            </p>

            <div className='flex justify-center items-center pb-28 pt-10 font-Rubik'>
                <div>
                    <Getstartedbtn />
                </div>
                <Link href='#' className='flex justify-center items-center'>
                    <p className=' text-xl p-2 font-medium'>
                        {t("home.Whoareyou?")}
                    </p>
                    {i18n.language === "en" ? (
                        <svg
                            className='w-6 h-4 '
                            viewBox='0 0 12 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M0.331044 18.2567C-0.0794662 18.6262 -0.112745 19.2585 0.256714 19.669C0.626173 20.0795 1.25846 20.1128 1.66897 19.7433L11.669 10.7433C12.1104 10.3461 12.1104 9.65396 11.669 9.25671L1.66897 0.256714C1.25846 -0.112745 0.626173 -0.0794662 0.256714 0.331044C-0.112745 0.741554 -0.0794662 1.37384 0.331044 1.7433L9.50516 10L0.331044 18.2567Z'
                                fill='#1A1A1A'
                            />
                        </svg>
                    ) : (
                        <svg
                            className='w-6 h-4 '
                            viewBox='0 0 12 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M11.669 18.2567C12.0795 18.6262 12.1128 19.2585 11.7433 19.669C11.3738 20.0795 10.7415 20.1128 10.331 19.7433L0.331035 10.7433C-0.110345 10.3461 -0.110345 9.65396 0.331035 9.25671L10.331 0.256714C10.7415 -0.112745 11.3738 -0.0794662 11.7433 0.331044C12.1128 0.741554 12.0795 1.37384 11.669 1.7433L2.49485 10L11.669 18.2567Z'
                                fill='#1A1A1A'
                            />
                        </svg>
                    )}
                </Link>
            </div>
        </>
    );
};

export default Homepage;
