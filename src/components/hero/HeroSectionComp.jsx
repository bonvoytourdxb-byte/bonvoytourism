import React from "react";

function HeroCTR({ img, heading, para }) {
    return (
        <div
            style={{
                backgroundImage: `url(${img})`,
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                boxShadow: "#00000036 0px 0px 0px 100vmax",
                clipPath: "inset(0 -100vmax)",
            }}
            className="w-screen ml-[calc(50%-50vw)] relative py-[60px] md:py-[100px] px-6 sm:px-10 md:px-14 lg:px-20"
        >
            <div className="relative z-10 pt-[210px] flex flex-col">
                <h2 className="text-[#fefefe] text-[30px] md:text-[44px] font-semibold">
                    {heading}
                </h2>
                <p className="text-[#fefefe] text-[16px] md:leading-relaxed">
                    {para}
                </p>
            </div>
        </div>
    );
}
export default HeroCTR;
