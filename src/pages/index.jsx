import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

// import Homepage from "@/components/Homepage";

import Layout from "@/layout/Layout";
import Eventcard from "@/components/Eventcard";

export default function HomePage() {
    const { t } = useTranslation("common");

    return (
        <Layout>
            {/* <Homepage /> */}
            <Eventcard />
            {/* <p>{t("test")}</p>

            <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                <Link href='/' locale='en'>
                    English
                </Link>
                <Link href='/' locale='ar'>
                    العربية
                </Link>
            </div>
            {/* <Footer/> */}
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
