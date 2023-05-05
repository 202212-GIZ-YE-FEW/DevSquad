import Link from "next/link";
import { useTranslation } from "next-i18next";
const Getstartedbtn = () => {
    const { t } = useTranslation("common");
    return (
        <div>
            <Link
                href='/signup'
                className='w-80 h-7 py-2.5 px-4 rounded-lg overflow-hidden group bg-primary-blue relative hover:bg-gradient-to-r hover:from-primary-blue hover:to-blue-200 text-white text-xl font-medium hover:ring-2 hover:ring-offset-2 hover:ring-primary-blue transition-all ease-out duration-300'
            >
                <span class='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease'></span>
                <span class='relative'>{t("home.GetStarted")}</span>
            </Link>
        </div>
    );
};

export default Getstartedbtn;
