"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '../components/BackButton/BackButton';
import SpecialButton from '../components/SpecialButton/SpecialButton';
import Link from 'next/link';

const SharePage = () => {
  const [data, setData] = useState<any>(null);
  const [dataMatrix, setDataMatrix] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('shareData');
    const storedDataMatrix = localStorage.getItem('shareDataMatrix');
    if (storedDataMatrix) {
      setDataMatrix(JSON.parse(storedDataMatrix));
    }
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      router.push('/save');
    }
  }, [router]);

  const handleShare = (method: 'email' | 'whatsapp') => {
    if (data) {
        const dataString = `ID: ${data.id}\nDate: ${data.date}\n\nProximity Data:\n${data.proximityData}\n\n, Light Intensity Data:\n${data.lightData}`;
        const encodedDataString = encodeURIComponent(dataString);
      if (method === 'email') {
        window.location.href = `mailto:?subject=Sensor Data&body=${encodedDataString}`;
      } else if (method === 'whatsapp') {
        window.location.href = `https://wa.me/?text=${encodedDataString}`;
      }
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between"> 
            <div className="mx-4">
                <div className="bg-black text-white text-4xl text-center font-bold mb-5 mt-10">
                    SHARE
                </div>  
                <div className='grid mt-40'>
                    <button  onClick={() => handleShare('email')} className="rounded-full border border-red-500 flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-2 mx-2">MAIL</button>
                    <button  onClick={() => handleShare('whatsapp')} className="rounded-full border border-green-500 flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-2 mx-2">WHATSAPP</button>
                </div>
                
            </div>
            <div className="ml-2 mx-2"> 
                <Link href={'/save'} className="rounded-full border border-black flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-5 mx-5">
                    BACK
                </Link>
            </div>
        </div>
  );
}

export default SharePage;