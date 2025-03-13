import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Image
        src={"/meme/st,small,507x507-pad,600x600,f8f8f8.u3.jpg"}
        width={256}
        height={256}
        alt="Not Found"
      />
    </div>
  );
}
