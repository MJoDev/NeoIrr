"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '../components/BackButton/BackButton';

const SavePage = () => {
  const [data, setData] = useState<any>(null);
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
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
        description,
      };
      const existingRecords = JSON.parse(localStorage.getItem('records') || '[]');
      existingRecords.push(newRecord);
      localStorage.setItem('records', JSON.stringify(existingRecords));
      localStorage.removeItem('currentData');
      alert('Data saved successfully!');
      router.push('/records');
    }
  };

  return (
        <div className="flex flex-col h-screen justify-between"> 
            <div className="mx-4">
                <div className="bg-black text-white text-4xl text-center font-bold mb-10 mt-10">
                    SAVE
                </div> 
                
            </div>
            <div>
                
            </div>
            <div className="ml-2 mx-2"> 
                <div className='grid grid-cols-2'>
                    <button  className="rounded-full border border-blue-500 flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-2 mx-2">SAVE</button>
                    <button  className="rounded-full border border-blue-800 flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-2 mx-2">SHARE</button>
                </div>
                <BackButton/>
            </div>
        </div>
  );
}

export default SavePage;