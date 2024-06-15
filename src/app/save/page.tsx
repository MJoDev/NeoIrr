"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '../components/BackButton/BackButton';

const SavePage = () => {
  const [data, setData] = useState<any>(null);
  const [id, setId] = useState('');
  const [date, setDate] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('currentData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const saveData = () => {
    if (data) {
      const newRecord = {
        ...data,
        id,
        date,
      };
      const existingRecords = JSON.parse(localStorage.getItem('records') || '[]');
      existingRecords.push(newRecord);
      localStorage.setItem('records', JSON.stringify(existingRecords));
      localStorage.removeItem('currentData');
      alert('Data saved successfully!');
      router.push('/record');
    }
  };

  const handleShareClick = () => {
    if (id && date) {
      const shareData = {
        ...data,
        id,
        date,
      };
      localStorage.setItem('shareData', JSON.stringify(shareData));
      router.push('/share');
    }
  };
  const isShareButtonDisabled = !id || !date;


  return (
        <div className="flex flex-col h-screen justify-between"> 
            <div className="mx-4">
                <div className="bg-black text-white text-4xl text-center font-bold mb-5 mt-10">
                    REC
                </div> 
                <div className='grid grid-cols-2 gap-2'>
                    <button className="bg-gray-400 text-white text-4xl text-center font-bold">
                        GENERAL
                    </button>
                    <button className="bg-gray-400 text-white text-4xl text-center font-bold">
                        MATRIX
                    </button>  
                </div>
                {!data && (
                  <div className='grid mt-10'>
                      <div className='mt-5'>
                          <label className="block mb-2 text-md font-medium text-gray-900 ">DD/MM/YYY</label>
                          <input type="date" placeholder="DD/MM/YYY" value={id} onChange={(e) => setDate(e.target.value)} className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"/>
                      </div>
                      <div className='mt-5'>
                          <label className="block mb-2 text-md font-medium text-gray-900">TAG / SN / ID</label>
                          <input type="text" placeholder="TAG / SN / ID" value={id} onChange={(e) => setId(e.target.value)} className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "/>
                      </div>
                 </div>
                )}
                
            </div>
            <div>
                
            </div>
            <div className="ml-2 mx-2"> 
                <div className='grid grid-cols-2'>
                    <button onClick={saveData} className="rounded-full border border-blue-500 flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-2 mx-2">SAVE</button>
                    <button  onClick={handleShareClick} disabled={isShareButtonDisabled} className="rounded-full border border-blue-800 flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-2 mx-2">SHARE</button>
                </div>
                <BackButton/>
            </div>
        </div>
  );
}

export default SavePage;