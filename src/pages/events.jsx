import { collection, getDocs } from "firebase/firestore";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Eventslist from "@/components/Eventslist";
import ScrollerTopcomponent from "@/components/ScrollerTopcomponent";

import Layout from "@/layout/Layout";

import { db } from "../../config/firebase";
let eventsCollectionRef = collection(db, "events");
const events = (props) => {
    return (
        <div>
            <Layout>
                <Eventslist items={props} />
                <ScrollerTopcomponent />
            </Layout>
        </div>
    );
};

export async function getStaticProps({ locale }) {
    const entries = await getDocs(eventsCollectionRef);
    const entriesData = entries.docs.map((entry) => ({
        id: entry.id,
        ...entry.data(),
    }));
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            entries: entriesData,
        },
    };
}

export default events;
