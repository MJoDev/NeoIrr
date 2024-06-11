import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex w-full justify-center py-5 mx-auto mb-10 footerPage">
            <Link href="/"><img className="w-auto h-20 size-20" src="./neoirr.png" alt="NeoIrr"/></Link>
        </footer>  
    )
}