"use client"

import { toast } from "sonner"
import Image from "next/image"
import React from 'react';

export function Avatar() {
    return (
        <Image
            src='/k.jpg'
            width={72}
            height={72}
            alt=""
            className="myavt rounded-full"
            onClick={
                () => {
                    toast("Hi", {
                        description: "One day we will climb the highest mountain, and swey the smallest point.",
                        action: {
                            label: "Yes",
                            onClick: () => console.log("Yes, we will"),
                        },
                    })
                }
            }
        />
    )
}


export function PersonalInfoCard() {
    const [imageSize, setImageSize] = React.useState("w-20 md:w-24");

    const handleScroll = () => {
        if (window.scrollY > 70) {
            setImageSize("w-16 md:w-20 transition-all duration-300"); // 稍微缩小一些并添加动画
        } else {
            setImageSize("w-20 md:w-24 transition-all duration-300");
        }
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="sticky top-0 bg-white z-10 py-4 flex animate-slide-down justify-between items-start backdrop-blur-sm bg-opacity-90">
            <div className="">
                <h1 className="text-4xl font-mono">Ke Xu</h1>
                <div className="mt-2 text-xs">
                    <div className="border-0 border-green-500 text-gray-500">
                        kexu567@gmail.com
                    </div>
                    <div className="border-0 border-green-500 text-gray-500">
                        Shanghai, China
                    </div>
                </div>
                <div className="border-0 border-green-500 mt-2 text-xs text-gray-600 w-2/3 lg:w-5/6">
                    Information Systems, Data Mining, Web3, and Blockchain Technology.
                </div>
            </div>

            <Image
                src="/kexu_photo.jpg"
                alt="kexu_photo"
                width={2125} // md尺寸下的宽度
                height={3217} // md尺寸下的高度
                className={`${imageSize} object-cover mr-4 rounded-sm shadow-lg`}
            />
        </div>
    )
}