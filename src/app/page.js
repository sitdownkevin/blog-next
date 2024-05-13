
import Link from "next/link";
import Image from "next/image";

import { toast } from "sonner";

import { Avatar } from "@/components/ClientComponent";

import { PostCardCover } from "@/components/PostCard";
import { QuickrefCardCover, QuickrefCardPopOver } from "@/components/QuickRefCard";

import { getMarkdownPostsDataJson } from "@/lib/RenderMarkdown";
import { getAllQuickrefData, getAllQuickrefContent } from '@/lib/RenderQuickrefs';

export default async function Home() {
  const quickrefData = getAllQuickrefData();

  const quickrefContent = await getAllQuickrefContent();

  const postsData = getMarkdownPostsDataJson();
  const selectedPostsData = [...postsData].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        
        <div className="flex flex-col justify-center items-center p-16 w-full">
          <Avatar />
        </div>

        {/* <div className="flex flex-col w-full">
          <h3>About</h3>
        </div> */}

        <div className="flex flex-col w-full mt-8">
          <h3><Link href={'/quickrefs'}>Quick Refs</Link></h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {quickrefContent.map((content, index) => (<QuickrefCardPopOver content={content} key={index}/>))}
          </div>
        </div>

        <div className="flex flex-col w-full mt-8">
          <h3><Link href={'/posts'}>Posts</Link></h3>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {selectedPostsData.map((post) => (<PostCardCover key={post.slug} post={post} />))}
          </div>
        </div>
      </div>
    </>

  );
}
