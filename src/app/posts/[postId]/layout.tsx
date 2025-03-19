import "katex/dist/katex.min.css";
import '@/app/posts/[postId]/markdown.css';
import 'prismjs/themes/prism.min.css';


export default function PostLayout({ children }) {
    return (
        <div className="w-full flex flex-col">
            {children}
        </div>
    )
}