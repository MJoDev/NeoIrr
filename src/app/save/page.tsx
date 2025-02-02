"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '../components/BackButton/BackButton';

const SavePage = () => {
  const [matrixData, setMatrixData] = useState<{ proximityData: string[], lightData: string[] } | null>(null);
  const [data, setData] = useState<any>(null);
  const [id, setId] = useState('');
  const [date, setDate] = useState('');
  const [HsU, setHsU] = useState('');
  const [ intensity, setIntensity] = useState('');
  const [ observations, setObservations] = useState('');


  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('currentData');
    const matrixDataRaw = localStorage.getItem('matrixData');
    
    if (storedData) {
      try {
        setData(JSON.parse(storedData)); // Assuming setData expects an object
      } catch (error) {
        console.error('Error parsing storedData:', error);
      }
    }else if (matrixDataRaw) {
      try {
        setMatrixData(JSON.parse(matrixDataRaw)); // Assuming setMatrixData expects an array
      } catch (error) {
        console.error('Error parsing matrixData:', error);
      }
    }
  }, []);
  

  const saveData = () => {
    if (data && date && id) {
      const newRecord = {
        ...data,
        id,
        date,
        HsU,
        intensity,
        observations
      };
      const existingRecords = JSON.parse(localStorage.getItem('savedRecords') || '[]');
      existingRecords.push(newRecord);
      localStorage.setItem('savedRecords', JSON.stringify(existingRecords));
      localStorage.removeItem('currentData');
      alert('Data Saved Successfully!');
      router.push('/record');
    } else if (matrixData && date && id) {
      const record = {
        id,
        date,
        HsU,
        intensity,
        observations,
        proximityData: matrixData.proximityData,
        lightData: matrixData.lightData,
      };
      const savedRecords = JSON.parse(localStorage.getItem('savedRecords') || '[]');
      savedRecords.push(record);
      localStorage.setItem('savedRecords', JSON.stringify(savedRecords));
      alert('Data Saved Successfully!');
      localStorage.removeItem('matrixData');
      router.push('/record'); // Redirect to home or records page after saving
    } else {
      alert('Please fill in all fields before saving.');
    }
  };

  const handleShareClick = () => {
    if (data &&id && date) {
      const shareData = {
        ...data,
        id,
        date,
        HsU,
        intensity,
        observations
      };
      localStorage.setItem('shareData', JSON.stringify(shareData));
      router.push('/share');
    } else if (matrixData && id && date) {
      const shareData = {
        id,
        date,
        HsU,
        intensity,
        observations,
        proximityData: matrixData.proximityData,
        lightData: matrixData.lightData,
      };
      localStorage.setItem('shareDataMatrix', JSON.stringify(shareData));
      router.push('/share');
    } else {
      alert('Please fill in all fields before sharing.');
    }
  };
  const isShareButtonDisabled = !id || !date;


  return (
        <div className="flex flex-col h-screen justify-between"> 
            <div className="mx-4">
                <div className="bg-black text-white text-4xl text-center font-bold mb-5 mt-10">
                    SAVE
                </div> 
                { data ? (
                  <div className='grid grid-cols-2 gap-2'>
                  <button className="bg-gray-800 text-white text-3xl text-center font-bold">
                      GENERAL
                  </button>
                  <button className="bg-gray-400 text-white text-3xl text-center font-bold">
                      MATRIX
                  </button>  
                   </div>
                ) : (
                  <div className='grid grid-cols-2 gap-2'>
                  <button className="bg-gray-400 text-white text-3xl text-center font-bold">
                      GENERAL
                  </button>
                  <button className="bg-gray-800 text-white text-3xl text-center font-bold">
                      MATRIX
                  </button>  
                   </div>
                )}
                
                {(data || matrixData) && (
                  <div className='grid mt-10'>
                      <div className='mt-5'>
                          <label className="block mb-2 text-md font-medium text-gray-900 ">DD/MM/YYY</label>
                          <input type="date" placeholder="DD/MM/YYY" value={date} onChange={(e) => setDate(e.target.value)} className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"/>
                      </div>
                      <div className='mt-5'>
                          <label className="block mb-2 text-md font-medium text-gray-900">TAG / SN / ID</label>
                          <input type="text" placeholder="TAG / SN / ID" value={id} onChange={(e) => setId(e.target.value)} className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "/>
                      </div>
                      <div className='mt-5'>
                          <label className="block mb-2 text-md font-medium text-gray-900">HsU:</label>
                          <input type="text" placeholder="Hours of Use" value={id} onChange={(e) => setHsU(e.target.value)} className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "/>
                      </div>
                      <div className='mt-5'>
                          <label className="block mb-2 text-md font-medium text-gray-900">Intensity</label>
                          <input type="text" placeholder="Intensity" value={id} onChange={(e) => setIntensity(e.target.value)} className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "/>
                      </div>
                      <div className='mt-5'>
                          <label className="block mb-2 text-md font-medium text-gray-900">Observations</label>
                          <input type="text" placeholder="Observations" value={id} onChange={(e) => setObservations(e.target.value)} className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "/>
                      </div>
                 </div>
                )}
                
            </div>
            <div>
                
            </div>
            <div className="ml-2 mx-2"> 
                <div className='grid grid-cols-2'>
                    <button onClick={saveData} className="rounded-full border border-blue-800 bg-blue-800 text-white flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-2 mx-2">SAVE</button>
                    <button  onClick={handleShareClick} disabled={isShareButtonDisabled} className="rounded-full border border-blue-600 bg-blue-600 text-white flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-2 mx-2">SHARE</button>
                </div>
                <BackButton/>
            </div>
        </div>
  );
}

export default SavePage;