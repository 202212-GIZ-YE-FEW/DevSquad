import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SignUp from "@/components/SignUp";

import Layout from "@/layout/Layout";

const signup = () => {
    return (
        <div>
            <Layout>
                <SignUp />
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

export default signup;
