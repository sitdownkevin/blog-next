"use client"

import { toast } from "sonner"
import Image from "next/image"

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