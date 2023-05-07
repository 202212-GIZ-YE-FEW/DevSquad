import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import Layout from "@/layout/Layout";

export default function NotFoundPage() {
    const { t } = useTranslation("common");
    const router = useRouter();
    return (
        <Layout>
            <div className='relative flex flex-col items-center justify-center'>
                <iframe
                    src='https://lottie.host/?file=1778ed88-38e9-4008-9af8-f3775f809201/b7MQ06OrfE.json'
                    className='z-1 w-96 h-96'
                ></iframe>
                <div className='z-2 absolute bottom-1 rounded font-Rubik bg-white p-2 text-2xl text-[#9d9b9b] md:bottom-10 md:text-3xl lg:bottom-12'>
                    <h3>{t("404.pagenotfound")} </h3>
                </div>
            </div>
            <div className='relative flex flex-col items-center'>
                <button
                    type='button'
                    className='rounded-lg   p-2 shadow-md font-Rubik border border-[#ebebeb] md:bottom-10 md:text-3xl lg:bottom-12 pb-2 m-2.5 overflow-hidden group bg-primary-blue relative hover:bg-gradient-to-r hover:from-primary-blue hover:to-blue-200 text-white text-xl font-medium hover:ring-2 hover:ring-offset-2 hover:ring-primary-blue transition-all ease-out duration-300'
                    onClick={() => router.back()}
                >
                    <span class='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-80 ease'></span>
                    <span className='relative'>
                        {t("404.Clickheretogoback")}
                    </span>
                </button>
            </div>
        </Layout>
    );
}
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
