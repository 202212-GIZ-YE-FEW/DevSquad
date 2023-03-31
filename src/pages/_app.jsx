import { appWithTranslation } from "next-i18next";

import "@/styles/globals.css";
import "@/styles/navbar.css";
import "@/styles/Hirosection.css";
function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
