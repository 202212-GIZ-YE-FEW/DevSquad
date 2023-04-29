import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import Layout from "@/layout/Layout";

export default function NotFoundPage() {
    const router = useRouter();
    return (
        <Layout>
            <div className='relative flex flex-col items-center justify-center'>
                <iframe
                    src='https://lottie.host/?file=1778ed88-38e9-4008-9af8-f3775f809201/b7MQ06OrfE.json'
                    className='z-1 w-96 h-96'
                ></iframe>
                <div className='z-2 absolute bottom-1 rounded font-Rubik bg-white p-2 text-2xl text-[#9d9b9b] md:bottom-10 md:text-3xl lg:bottom-12'>
                    <h3>Oops.. page not found</h3>
                </div>
            </div>
            <div className='relative flex flex-col items-center'>
                <button
                    type='button'
                    className=' rounded shadow-md font-Rubik border border-[#ebebeb] bg-[#0180AB]  p-2 text-2xl text-[#fdfdfb] md:bottom-10 md:text-3xl lg:bottom-12 pb-2 m-2.5'
                    onClick={() => router.back()}
                >
                    Click here to go back
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
