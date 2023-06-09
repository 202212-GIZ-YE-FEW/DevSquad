import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ProfilePage from "@/components/ProfilePage";
import ScrollerTopcomponent from "@/components/ScrollerTopcomponent";

import Layout from "@/layout/Layout";

const profilepage = () => {
    return (
        <div>
            <Layout>
                <ProfilePage />
                <ScrollerTopcomponent />
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

export default profilepage;
