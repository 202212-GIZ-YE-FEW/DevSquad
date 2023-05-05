import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Getstartedbtn from "@/components/Getstartedbtn";

const Hirosection = () => {
    const { t } = useTranslation("common");
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div className='container mx-auto px-6 pt-12	pb-4 grid lg:grid-cols-2 gap-10  grid-cols-1 font-Rubik'>
            <div
                className='relative flex flex-col align-content-center justify-center align-items-start text-center lg:text-start'
                data-aos='fade-right'
            >
                <div className='md:absolute top-14 left-0 right-0 bottom-0 static'>
                    <div className='flex flex-col md:pt-20 pt-5'>
                        <p className='text-4xl font-medium p-2'>
                            {t("home.hiro.title")}
                        </p>
                        <p className='text-2xl text-primary-gray px-2 font-normal'>
                            {t("home.hiro.describtion")}
                        </p>
                    </div>
                    <div className='pt-10	'>
                        <Getstartedbtn />
                    </div>
                </div>
            </div>
            <div className='overflow-hidden' data-aos='fade-left'>
                <Image
                    src='/images/Image.png'
                    alt='hiro'
                    width={638}
                    height={638}
                    className='object-cover rounded-xl'
                />
            </div>
        </div>
    );
};

export default Hirosection;
