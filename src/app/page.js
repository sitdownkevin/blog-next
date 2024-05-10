import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import utilStyles from "../styles/util.module.css";

import { PostCardCover } from "@/components/PostCard";
import { getMarkdownPostsData } from "@/lib/RenderMarkdown";

export default function Home() {
  const quickRefs = ['Brew', 'PyPI', 'Conda', 'Git']
  const quickRefCards = quickRefs.map((name, index) => ({name: name, key: index}));

  const postsData = getMarkdownPostsData();

  return (
    <div className={utilStyles.gridVertical}>
      <div className={utilStyles.boxCenter}>
        <div style={{width: 72, height: 72, border: "1px solid black", borderRadius: "50%"}}></div>
      </div>
      
      <div className={utilStyles.boxLeft}>
        <h1>Quick Ref</h1>
        <div className={utilStyles.gridHorizontal}>
          {quickRefCards.map((card) => (
            <div className={utilStyles.cardSm} key={card.key}>
              {card.name}
            </div>
          ))}
        </div>
      </div>

      <div className={utilStyles.boxLeft}>
          <h1>Projects</h1>
          <div className={utilStyles.gridHorizontal}>
            {quickRefCards.map((card) => (
              <div className={utilStyles.cardMd} key={card.key}>
                {card.name}
              </div>
            ))}
          </div>
      </div>


      <div className={utilStyles.boxLeft}>
          <h1><Link href={'/posts'} className={utilStyles.link}>Posts</Link></h1>
          <div className={utilStyles.gridHorizontal}>
            {postsData.map((post) => (<PostCardCover key={post.slug} post={post} />))}
          </div>
      </div>

      
    </div>
  );
}
