import Link from "next/link";

export default function BackButton() {
    return (
        <Link href={'/'} className="rounded-full border border-black flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-5 mx-5">
            BACK
        </Link>
    )
}