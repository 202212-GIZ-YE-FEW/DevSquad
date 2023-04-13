import Image from "next/image";
import { useTranslation } from "next-i18next";

import Getstartedbtn from "@/components/Getstartedbtn";

const Hirosection = () => {
    const { t } = useTranslation("common");
    return (
        <div className='container mx-auto md:px-32 px-10 pt-12	pb-4 grid md:grid-cols-2 gap-10  grid-cols-1 font-Rubik'>
            <div className='flex flex-col align-content-center justify-center align-items-start text-center md:text-start'>
                <div className='flex flex-col '>
                    <p className='text-5xl font-medium'>
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
            <div className='relative h-96 overflow-hidden'>
                <Image
                    src='/images/Image.png'
                    alt='profile'
                    fill
                    className='object-cover rounded-xl'
                />
            </div>
        </div>
    );
};

export default Hirosection;
