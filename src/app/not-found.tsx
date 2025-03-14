import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Image
        src={"/meme/404.png"}
        width={256}
        height={256}
        className="hover:scale-110 transition-all duration-300 hover:cursor-pointer"
        alt="Not Found"
      />
    </div>
  );
}
