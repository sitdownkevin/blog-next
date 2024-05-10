
import Link from "next/link";
import Image from "next/image";

import { PostCardCover } from "@/components/PostCard";
import { getMarkdownPostsData } from "@/lib/RenderMarkdown";

export default function Home() {
  const quickRefs = ['Brew', 'PyPI', 'Conda', 'Git',]
  const quickRefCards = quickRefs.map((name, index) => ({ name: name, key: index }));

  const postsData = getMarkdownPostsData();

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center p-8 w-full">
          <Image 
            src='/k.jpg'
            width={72}
            height={72}
            alt=""
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col w-full">
          <h3>Quick Ref</h3>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {quickRefCards.map((card) => (
                <div className="flex flex-col justify-center items-center p-4 rounded-md bg-gray-100" key={card.key}>
                  {card.name}
                </div>
              ))}
          </div>
        </div>

        
        <div className="flex flex-col w-full mt-8">
          <h3>Project</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {quickRefCards.map((card) => (
                <div className="flex flex-col justify-center items-center p-4 rounded-md bg-gray-100" key={card.key}>
                  {card.name}
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col w-full mt-8">
          <h3><Link href={'/posts'}>Posts</Link></h3>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {postsData.map((post) => (<PostCardCover key={post.slug} post={post} />))}
          </div>
        </div>
      </div>
    </>

  );
}
