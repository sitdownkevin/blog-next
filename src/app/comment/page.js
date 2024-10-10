

import { CommentSubmit } from "@/components/ClientComponent";
import { Button } from "@/components/ui/button";
import axios from "axios";


export default async function CommentPage() {


    const fetchComment = async () => {
        const response = await fetch('https://assist.kexu567.xyz/api/get_comments', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-cache",
        })

        const data = await response.json()
        const { comments } = data;
        // console.log(comments)
        
        return { comments }
    }
    
    const { comments } = await fetchComment();
    

    return (
        <div className="flex flex-col w-full space-y-8">
            <h1>Comment Number: {comments.length}</h1>

            <CommentSubmit />

            
            <div className="flex flex-col space-y-4">
                {
                    comments.reverse().map((comment, index) => {
                        return (
                            <div key={index} className="flex flex-col justify-between border p-4">
                                <div>{comment.content}</div>
                                <div className="text-xs">{new Date(comment.comment_ts*1000).toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}