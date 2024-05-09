"use client"


export default function Button() {

    const handleClick1 = () => {
        console.log('halo'); 
    }

    return (
        <>
            <button onClick={handleClick1}>Click me</button>
        </>
    )
}