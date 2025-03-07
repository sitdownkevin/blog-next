
import Link from 'next/link'

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center p-16">
                <h4><Link href='/quickrefs'>Quick Refs</Link></h4>
            </div>
            
            <div>
                {children}
            </div>
        </div>
    )
}