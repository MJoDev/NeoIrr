import Link from "next/link";

export default function RecordButton() {
    return (
        <Link href={'/record'} className="rounded-full border border-blue-500 flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition mx-5 ml-5">
            REC
        </Link>
    )
}