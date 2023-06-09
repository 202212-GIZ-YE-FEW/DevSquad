import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Aboutpage from "@/components/Aboutpage/Aboutpage";
import ScrollerTopcomponent from "@/components/ScrollerTopcomponent";

import Layout from "@/layout/Layout";

const aboutpage = () => {
    return (
        <div>
            <Layout>
                <Aboutpage />
                <ScrollerTopcomponent />
            </Layout>
        </div>
    );
};
export default aboutpage;
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
