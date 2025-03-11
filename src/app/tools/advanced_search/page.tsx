import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/meme/so-then-you-make-a-meme-about-it-v0-o4idh7hhj2id1.webp"
        alt="Advanced Search"
        width={256}
        height={256}
      />
    </div>
  );
}
