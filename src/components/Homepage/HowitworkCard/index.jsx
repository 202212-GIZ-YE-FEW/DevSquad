import AOS from "aos";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

import "aos/dist/aos.css";
const HowitworkCard = ({
    title,
    imageSrc,
    describtion,
    linkWord,
    hreflink,
}) => {
    const { i18n } = useTranslation();
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
            <div className='flex flex-col items-center font-Rubik'>
                <div className='relative w-52 h-52'>
                    <Image
                        src={imageSrc}
                        alt='profile'
                        fill
                        className='object-contain rounded-xl'
                        data-aos='zoom-in'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <p
                        className='text-3xl text-center font-medium '
                        data-aos='fade-up'
                    >
                        {title}
                    </p>
                    <p
                        className='text-lg text-primary-gray text-center font-normal'
                        data-aos='fade-up'
                    >
                        {describtion}
                    </p>
                    <Link
                        href={`${hreflink}`}
                        className='flex justify-center items-center cursor-pointer'
                        data-aos='fade-up'
                    >
                        <p className=' text-xl p-2 font-medium'>{linkWord} </p>
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
            </div>
        </>
    );
};

export default HowitworkCard;
