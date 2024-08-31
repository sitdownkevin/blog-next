import Image from "next/image"

export default function HiddenPage() {


    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <h3>Wechat</h3>
                <Image
                    src="/wechat.png"
                    alt="k-kimura"
                    width={1108}
                    height={1512}
                />
            </div>


        </>
    )
}