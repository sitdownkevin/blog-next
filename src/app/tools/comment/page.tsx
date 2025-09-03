import { Comment } from "@/components/features/posts/Comment"


export default async function Page() {
    return (
        // Add the width constraint wrapper div here
        <div className="w-5/6 md:w-2/3 lg:w-1/2 mx-auto">
            <Comment />
        </div>
    )
}