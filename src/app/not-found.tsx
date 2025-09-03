import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Image
        src={"/assets/images/meme/404.webp"}
        width={256}
        height={256}
        className="hover:scale-110 transition-all duration-300 hover:cursor-pointer"
        alt="Not Found"
      />
    </div>
  );
}
