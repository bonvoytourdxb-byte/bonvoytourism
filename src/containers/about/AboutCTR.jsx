"use client";
import React from "react";
import HeroCTR from "@/components/hero/HeroSectionComp";
import AllPackages from "@/containers/Home/AllPackagesCTR";
import ReviewCTR from "@/containers/Home/ReviewCTR";
import MemberCTR from "@/containers/about/MemberCTR";
import FindAdventureCTR from "@/containers/Home/FindAdventureCTR";

function AboutCTR() {
    return (
        <div>
            <HeroCTR
                img="/images/home/bg-subheader.jpg"
                heading="About Us"
                para="Varius blandit sit amet"
            />
            <div className="mt-12 md:mt-22">
                <div className="flex flex-col md:flex-row gap-4 md:gap-22 items-center justify-between">
                    <div
                        className="md:flex-1 w-full h-[318px] md:h-[418px] bg-cover bg-top rounded-md"
                        style={{ backgroundImage: "url('/images/about/about1.jpg')" }}
                    ></div>
                    <div className="flex-1">
                        <h3 className="text-[24px] md:text-[30px] text-[#666] font-semibold mb-2">A Perfect Place Vacation</h3>
                        <p className="text-[15px] text-[#8C8C8C] max-w-[730px] mb-4">Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
                        <p className="text-[13px] text-[#606060] max-w-[730px]">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam porta sem malesuada magna mollis euismod. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam porta sem malesuada magna mollis euismod. Vivamus sagittis.</p>
                    </div>
                </div>
                <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-22 items-center justify-between mt-4 md:mt-0">
                    <div className="flex-1">
                        <h3 className="text-[24px] md:text-[30px] text-[#666] font-semibold mb-2">About Our Service</h3>
                        <p className="text-[15px] text-[#8C8C8C] max-w-[730px] mb-4">Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                        <p className="text-[13px] text-[#606060] max-w-[730px]">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam porta sem malesuada magna mollis euismod. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam porta sem malesuada magna mollis euismod. Vivamus sagittis.</p>
                    </div>
                    <div
                        className="md:flex-1 w-full h-[318px] md:h-[418px] bg-cover bg-top rounded-md"
                        style={{ backgroundImage: "url('/images/about/about2.jpg')" }}
                    ></div>
                </div>
            </div>
            <div className="-mx-6 sm:-mx-10 md:-mx-14 lg:-mx-20">
                <AllPackages />
            </div>
            <ReviewCTR />
            <div className="-mx-6 sm:-mx-10 md:-mx-14 lg:-mx-20">
                <MemberCTR />
            </div>
            <div className="-mx-6 sm:-mx-10 md:-mx-14 lg:-mx-20">
                <FindAdventureCTR
                    mt="mt-12 md:mt-22"
                />
            </div>
        </div>
    );
}

export default AboutCTR;
