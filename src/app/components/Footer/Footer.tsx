import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex w-full justify-center py-5 mx-auto mb-10 footerPage">
            <div className="grid grid-cols-1 justify-center text-center">
                <Link className="flex justify-center mb-3" href="/"><img className="w-auto h-20 size-20" src="./neoirr.png" alt="NeoIrr"/></Link>
                <div className="text-sm text-center font-bold">BASED ON IEC 60601-2-50, ISO/CIE 19476:2014 & AAP STANDARDS</div>
                <div className="text-sm text-center">UPDATED 2025</div>
            </div>      
        </footer>  
    )
}