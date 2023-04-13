import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Calendar from "@/components/Calendar";

import Layout from "@/layout/Layout";

const calendar = () => {
    return (
        <div>
            <Layout>
                <Calendar />
            </Layout>
        </div>
    );
};

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}

export default calendar;
