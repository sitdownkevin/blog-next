import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 space-y-20 text-center">
      <h2>Not Found</h2>
      <Image src={"/favicon-32x32.png"} width={16} height={16} alt="Not Found" />
      <Image src={"/favicon-32x32.png"} width={16} height={16} alt="Not Found" />
      <Image src={"/favicon-32x32.png"} width={16} height={16} alt="Not Found" />

      <Image src={"/favicon-32x32.png"} width={16} height={16} alt="Not Found" />
      <Image src={"/favicon-32x32.png"} width={16} height={16} alt="Not Found" />
      <Image src={"/favicon-32x32.png"} width={16} height={16} alt="Not Found" />
    </div>
  )
}