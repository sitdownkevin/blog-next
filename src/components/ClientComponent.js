"use client"

import Image from "next/image";
import React from 'react';

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import axios from "axios";

export function PersonalInfoCardHeader() {
    const [isSticky, setIsSticky] = React.useState(false);

    const handleScroll = () => {
        setIsSticky(window.scrollY > 0);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className={`block md:hidden mb-4`}>
                <div className="flex flex-col space-y-4 justify-center items-center md:items-start">
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
                        Information Systems, Data Mining, and Blockchain Technology.
                    </div>
                </div>
            </div>

            <div className={`hidden md:block top-0 z-10`}>
                <div className={`grid grid-cols-5 py-2 bg-white backdrop-blur-sm bg-opacity-90`}>
                    <div className={`col-span-5 md:col-span-4 flex flex-col space-y-4 transition-transform duration-300 justify-center items-center md:items-start`}>
                        <h1 className={`text-5xl font-mono`}>Ke Xu</h1>
                        <div className="text-xs">
                            <div className="text-gray-500">
                                kexu567@gmail.com
                            </div>
                            <div className="text-gray-500">
                                Shanghai, China
                            </div>
                        </div>
                        <div className="text-xs text-gray-800">
                            Information Systems, Data Mining, and Blockchain Technology.
                        </div>
                    </div>
                    <Image
                        src="/kexu_photo.jpg"
                        alt="kexu_photo"
                        width={2125}
                        height={3217}
                        className={`hidden lg:block
                        w-20 rounded-lg shadow-sm shadow-gray-500/50`}
                    />
                </div>
            </div>

        </>

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


export function CommentSubmit() {
    const [comment, setComment] = React.useState("");

    const addComment = async () => {
        if (comment.length === 0) {
            return;
        }

        const response = await axios.post('/api/add_comment', {
            content: comment, domain: "kexu567.xyz"
        });

        window.location.reload();
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }



    return (
        <div className="flex flex-col w-full space-y-2">
            <Textarea label="Leave a comment" value={comment} onChange={handleCommentChange} />
            <Button onClick={addComment}>Submit</Button>
        </div>
    )
}