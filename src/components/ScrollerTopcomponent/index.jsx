import React from "react";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
const ScrollerTopcomponent = () => {
    const [showButton, setShowButton] = useState(false);
    const onScroll = () => {
        // Scroll to top button logic
        window.scrollY > 500 ? setShowButton(true) : setShowButton(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    });

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };
    return (
        <div>
            <FaArrowUp
                className={
                    showButton
                        ? "fixed right-[-100px]  bg-orange-300 text-white rounded-full p-3 cursor-pointer bottom-5 transform translate-x-[-150px]  animate-[slideLeft_1s] w-14 h-14 none"
                        : "none"
                }
                onClick={scrollToTop}
            />
        </div>
    );
};

export default ScrollerTopcomponent;
