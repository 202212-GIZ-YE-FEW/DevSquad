import Goalimage from "./Goalimage";
import Hirosection from "./Hirosection";
import HowitworkCard from "./HowitworkCard";
import VolunteerCard from "./VolunteerCard";
import Image from "next/image";
import Link from "next/link";

const Homepage = () => {
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
    return (
        <>
            {/* hiro section */}
            <Hirosection />
            {/* how it work section */}
            <p className='text-4xl text-center py-16 font-Rubik font-medium'>
                How it work
            </p>
            <div className='container mx-auto md:px-32 px-10 pt-12	pb-4 grid lg:grid-cols-3 gap-10 grid-cols-1 font-Rubik'>
                <HowitworkCard
                    title='Register'
                    imageSrc='/images/ManTop.png'
                    describtion=' Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consectetur at, illum itaque facilis'
                    linkWord='Sign up'
                />
                <HowitworkCard
                    title='Attend evevts'
                    imageSrc='/images/attend.png'
                    describtion=' Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consectetur at, illum itaque facilis'
                    linkWord='View events'
                />
                <HowitworkCard
                    title='Organize your own!'
                    imageSrc='/images/Girl.png'
                    describtion=' Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consectetur at, illum itaque facilis'
                    linkWord='Get started'
                />
            </div>
            {/* goals dection */}
            <p className='text-4xl text-center pt-28 pb-5 font-Rubik font-medium'>
                Sustainable Devlopment Goals
            </p>
            <p className='md:px-40 px-10  text-xl text-primary-gray text-center font-Rubik font-normal'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Asperiores aliquam unde voluptatem accusantium, obcaecati
                tenetur magnam aliquid. Dignissimos soluta quia ea consequuntur
                molestias ut
            </p>
            <div className='container mx-auto md:px-32 px-20 pt-12	pb-4 grid lg:grid-cols-6 gap-5 md:grid-cols-4 grid-cols-2 items-center font-Rubik'>
                <Goalimage arrImage={arrImage} />
            </div>
            {/* volunteer */}
            <p className='text-4xl text-center pt-20 font-Rubik font-medium'>
                Hear it from volunteers
            </p>
            <div className='container mx-auto md:px-32 px-10 pt-12	pb-4 grid md:grid-cols-3 gap-10 grid-cols-1 font-Rubik'>
                <VolunteerCard
                    volunteerImage='/images/volunteer.png'
                    name='Name, Occupation'
                    voldescribtion='"Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consectetur at ."'
                />
                <VolunteerCard
                    volunteerImage='/images/volunteer.png'
                    name='Name, Occupation'
                    voldescribtion='"Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consectetur at ."'
                />
                <VolunteerCard
                    volunteerImage='/images/volunteer.png'
                    name='Name, Occupation'
                    voldescribtion='"Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consectetur at".'
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
                        />
                    </div>
                    <div className='relative h-80 overflow-hidden '>
                        <Image
                            src='/images/home1.png'
                            alt='profile'
                            fill
                            className='object-cover rounded-3xl p-3'
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
                        />
                    </div>
                    <div className='relative h-60 overflow-hidden'>
                        <Image
                            src='/images/home3.png'
                            alt='profile'
                            fill
                            className='object-cover rounded-3xl p-3'
                        />
                    </div>
                </div>
            </div>
            {/* final section */}
            <p className='text-4xl text-center pt-24 pb-5 font-Rubik lg:px-96 md:px-52 px-10 font-medium'>
                Become the change you wish to see in the world
            </p>
            <p className='md:px-40 px-10 text-xl text-primary-gray text-center font-Rubik font-normal'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Asperiores aliquam unde voluptatem accusantium, obcaecati
                tenetur magnam aliquid. Dignissimos soluta quia ea consequuntur
                molestias ut
            </p>

            <div className='flex justify-center items-center pb-28 pt-10 font-Rubik'>
                <div className='	'>
                    <Link
                        href='/blogs'
                        className='w-20 h-7 py-2.5 px-4 rounded-lg bg-primary-blue text-white text-2xl font-medium'
                    >
                        Get Started
                    </Link>
                </div>
                <Link href='#' className='flex justify-center items-center'>
                    <p className=' text-xl p-2 font-medium'>Who are you ? </p>
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
                </Link>
            </div>
        </>
    );
};

export default Homepage;
