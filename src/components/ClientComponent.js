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
    const [isSticky, setIsSticky] = React.useState(false);

    const handleScroll = () => {
        setIsSticky(window.scrollY > 0);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`grid grid-cols-5 py-2 bg-white backdrop-blur-sm bg-opacity-90 ${isSticky ? 'md:sticky md:top-0 md:z-10' : ''}`}>
            <div className="col-span-5 md:col-span-4 flex flex-col space-y-2 justify-center items-center md:items-start">
                <h1 className="text-4xl md:text-5xl font-mono">Ke Xu</h1>
                <div className="text-xs">
                    <div className="text-gray-500">
                        kexu567@gmail.com
                    </div>
                    <div className="text-gray-500">
                        Shanghai, China
                    </div>
                </div>
                <div className="text-xs text-gray-600">
                    Information Systems, Data Mining, Web3, and Blockchain Technology.
                </div>
            </div>
            <Image
                src="/kexu_photo.jpg"
                alt="kexu_photo"
                width={2125} // md尺寸下的宽度
                height={3217} // md尺寸下的高度
                className="w-20 rounded-sm shadow-lg shadow-gray-500/50 hidden md:block"
            />
        </div>
    )
}


export function PersonalInfoCard4() {
    const [containerSize, setContainerSize] = React.useState("w-full h-64");

    const handleScroll = () => {
        const shouldShrink = window.scrollY > 70;
        setContainerSize(`${shouldShrink ? "w-full h-48" : "w-full h-64"} transition-all duration-300`);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`sticky top-0 bg-white z-10 py-4 flex flex-col animate-slide-down justify-between items-start backdrop-blur-sm bg-opacity-90 ${containerSize}`}>
            <div className="flex w-full h-full">
                <div className="flex-1 flex flex-col justify-between">
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
                <div className="flex-1 flex justify-end items-center">
                    <Image
                        src="/kexu_photo.jpg"
                        alt="kexu_photo"
                        width={2125} // md尺寸下的宽度
                        height={3217} // md尺寸下的高度
                        className={`${containerSize.split(" ")[2]} object-cover mr-4 rounded-sm shadow-lg`}
                    />
                </div>
            </div>
        </div>
    )
}

export function PersonalInfoCardBak() {
    const [imageSize, setImageSize] = React.useState("w-20 md:w-24");

    const handleScroll = () => {
        const shouldShrink = window.scrollY > 100;
        setImageSize(`${shouldShrink ? "w-16 md:w-20" : "w-20 md:w-24"} transition-all duration-0`);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="sticky top-0 bg-white z-10 py-4 flex animate-slide-down justify-between items-start backdrop-blur-sm bg-opacity-90 w-full">
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

export function PostCardHeader({ title }) {
    const [fontSize, setFontSize] = React.useState("text-3xl sm:text-4xl md:text-5xl");

    const handleScroll = () => {
        const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
        // 确保字体大小变化在移动端不会导致第一行字体卡住
        const newFontSize = `text-${Math.max(2, 5 - Math.floor(scrollPercentage * 3))}xl sm:text-${Math.max(3, 4 - Math.floor(scrollPercentage * 2))}xl md:text-${Math.max(4, 5 - Math.floor(scrollPercentage))}xl`;
        setFontSize(newFontSize);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="sticky top-0 bg-white z-10 py-4 flex animate-slide-down flex-col w-full backdrop-blur-md bg-opacity-90">
            <h1 className={`${fontSize} transition-all duration-300`}>{title}</h1>
        </div>)
}
