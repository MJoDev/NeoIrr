"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
    }else if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      router.push('/save');
    }
  }, [router]);

  const handleShare = (method: 'email' | 'whatsapp') => {
    if (data) {
        const dataString = ` ID: ${data.id}\n Date: ${data.date}\n\n P(0, y):\n${data.proximityData}\n\n G(x, y):\n${data.lightData}\n\n HsU:\n${data.HsU}\n\n Intensity:\n${data.intensity}\n\n Observations:\n${data.observations}`;
        const encodedDataString = encodeURIComponent(dataString);
      if (method === 'email') {
        window.location.href = `mailto:?subject=Sensor Data&body=${encodedDataString}`;
      } else if (method === 'whatsapp') {
        window.location.href = `https://wa.me/?text=${encodedDataString}`;
      }
    } if (dataMatrix) {
      const dataString = ` ID: ${dataMatrix.id}\n Date: ${dataMatrix.date}\n\n P(0, y):\n${dataMatrix.proximityData}\n\n M(x, y):\n${dataMatrix.lightData}\n\n HsU:\n${dataMatrix.HsU}\n\n Intensity:\n${dataMatrix.intensity}\n\n Observations:\n${dataMatrix.observations}`;
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
                    <button  onClick={() => handleShare('email')} className="rounded-full border border-red-500 bg-red-500 text-white flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-2 mx-2">MAIL</button>
                    <button  onClick={() => handleShare('whatsapp')} className="rounded-full border border-green-600 bg-green-600 flex text-white justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-2 mx-2">WHATSAPP</button>
                </div>
                
            </div>
            <div className="ml-2 mx-2"> 
                <Link href={'/'} className="rounded-full border border-black bg-black text-white flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-5 mx-5">
                    BACK
                </Link>
            </div>
        </div>
  );
}

export default SharePage;