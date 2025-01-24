"use client";

import * as React from "react"
import Image from "next/image";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


function Gallery({ data }) {

    return (
        <Carousel className="w-full h-full" opts={{
            align: "center",
            loop: true,
        }}>
            <CarouselContent>
                {data.map((item, index) => (
                    <CarouselItem key={index} className="lg:basis-1/2 h-full flex flex-col items-center justify-center space-y-4">
                        <Image
                            src={item.path}
                            alt={item.title}
                            width={400}
                            height={400}
                            className="rounded-lg"
                            quality={80}
                        />
                        <span className="text-xs text-gray-500">{item.description}</span>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}


export default function Page() {
    const data = [
        {
            title: "g1",
            path: "/gallery/g1.jpg",
            description: "Life in Chengdu"
        },
        {
            title: "g2",
            path: "/gallery/g2.jpg",
            description: "My hometown"
        },
        {
            title: "g3",
            path: "/gallery/g3.jpg",
            description: "Life in Shanghai"
        },
        {
            title: "g4",
            path: "/gallery/g4.jpg",
            description: "Favorite ice cream"
        },
    ];

    return <>
        <div className="flex flex-col items-center justify-center text-center">
            <Gallery data={data} />
        </div>

    </>
}
