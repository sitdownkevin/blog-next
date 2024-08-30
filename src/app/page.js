
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

        {/* <div className="flex flex-col justify-center items-center p-16 w-full">
          <Avatar />
        </div> */}

        <div className="flex flex-col w-full mt-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold">Ke Xu</h1>
              <div className="mt-2 text-sm">
                <div className="border-0 border-green-500 text-gray-500">
                  kexu567@gmail.com
                </div>
                <div className="border-0 border-green-500 text-gray-500">
                  Shanghai, China
                </div>
                <div className="border-0 border-green-500 mt-2">
                  Information System, Web3
                </div>
              </div>
            </div>
            <div className="w-24 h-32 border-0 border-green-500 relative">
              <Image
                src="/kexu_photo.jpg"
                alt="kexu_photo"
                fill={true}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <h2 className="mt-8 text-2xl font-semibold">Education</h2>
          <p>
            <span className="font-bold">Tongji University, Shanghai</span>
            <br />
            <span className="italic text-gray-600">Master&apos; Degree in Management Science and Engineering</span>
            <br />
            <span className="text-gray-600 text-sm">
              September 2024 - Present
            </span>
          </p>
          <p>
            <span className="font-bold">Sichuan University, Chengdu</span>
            <br />
            <span className="italic text-gray-600">Bachelor&apos; Degree in Industrial Engineering</span>
            <br />
            <span className="text-gray-600 text-sm">
              September 2020 - June 2024
            </span>
          </p>
          <h2 className="mt-8 text-2xl font-semibold">Word Experience</h2>
          <p>
            <span className="font-bold">Airbus Beijing Engineering Centre (ABEC), Beijing</span>
            <br />
            <span className="italic text-gray-600">Engineering Intern at ACO1I</span>
            <br />
            <span>
              Data Mining, Operation System (Kanban Development)
            </span>
            <br />
            <span className="text-gray-600 text-sm">
              January 2024 - May 2024
            </span>
          </p>
          <p>
            <span className="font-bold">West China Biomedical Big Data Center, Chengdu</span>
            <br />
            <span className="italic text-gray-600">Research Assistant</span>
            <br />
            <span>Active Learning, Contrastive Learning</span>
            <br />
            <span className="text-gray-600 text-sm">
              October 2022 - April 2023
            </span>
          </p>
          <h2 className="mt-8 text-2xl font-semibold">Projects</h2>
          <p>
            <span className="font-bold">Design and Control Method of Modular Mechanical Prosthesis, China</span>
            <br />
            <span className="italic text-gray-600">National Project of College Students&apos; Innovation and Entrepreneurship Competition</span>
            <br />
          </p>
          <h2 className="mt-8 text-2xl font-semibold">Publications</h2>
          <p>Xu, K., Chen, Y., & Nie, J. (2023). Subclass classification of ancient glassware based on K-Means and GMM. Highlights in Science, Engineering and Technology, 42, 277-284. https://doi.org/10.54097/hset.v42i.7106</p>
        
        
        </div>


        {/* <div className="flex flex-col w-full mt-8">
          <h3><Link href={'/quickrefs'}>Quick Refs</Link> <span className="text-sm">for Myself</span></h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {quickrefContent.map((content, index) => (<QuickrefCardPopOver content={content} key={index}/>))}
          </div>
        </div>

        <div className="flex flex-col w-full mt-8">
          <h3><Link href={'/posts'}>Posts</Link></h3>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {selectedPostsData.map((post) => (<PostCardCover key={post.slug} post={post} />))}
          </div>
        </div> */}
      </div>
    </>

  );
}
