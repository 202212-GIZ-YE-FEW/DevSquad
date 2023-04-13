import { useTranslation } from "next-i18next";
import * as React from "react";
import { useEffect, useState } from "react";

import Footer from "@/components/Footer/index";
import Navbar from "@/components/Navbar/Index";
export default function Layout({ children }) {
    // Put Header or Footer around the children element
    // Example
    const { i18n } = useTranslation();
    const [isRtl, setIsRtl] = useState(i18n.language === "ar"); // Assume Arabic is RTL

    useEffect(() => {
        setIsRtl(i18n.language === "ar");
    }, [i18n.language]);

    useEffect(() => {
        document.body.dir = isRtl ? "rtl" : "ltr";
    }, [isRtl]);
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
