"use client"
import { useEffect, useState } from "react"
import BackButton from "../components/BackButton/BackButton"
import { useBluetooth } from "../utils/BluetoothContext";
import { useRouter } from 'next/navigation';

export default function RecordPage() {

    const [savedRecords, setSavedRecords] = useState<any[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<Set<number>>(new Set());
    const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
    const router = useRouter();
    const [ eliminate, setEliminate ] = useState(false);

    useEffect(() => {
        const records = localStorage.getItem('savedRecords');
        if (records) {
          setSavedRecords(JSON.parse(records));
        }
      }, []);

      const handleCheckboxChange = (index: number) => {
        setSelectedRecords((prevSelectedRecords) => {
          const newSelectedRecords = new Set(prevSelectedRecords);
          if (newSelectedRecords.has(index)) {
            newSelectedRecords.delete(index);
          } else {
            newSelectedRecords.add(index);
          }
          return newSelectedRecords;
        });
      };
    
      const handleDeleteSelected = () => {
        const updatedRecords = savedRecords.filter((_, index) => !selectedRecords.has(index));
        setSavedRecords(updatedRecords);
        localStorage.setItem('savedRecords', JSON.stringify(updatedRecords));
        setSelectedRecords(new Set());
        setEliminate(false);
      };

      const handleShareSelected = () => {
        const updatedRecords = savedRecords.filter((_, index) => selectedRecords.has(index));
        setSavedRecords(updatedRecords);
        localStorage.setItem('shareData', JSON.stringify(updatedRecords));
        setSelectedRecords(new Set());
        router.push('/sharemany');
      };
    
      const handleDoubleClick = (record: any) => {
        setSelectedRecord(record);
      };
    
      const closeDetails = () => {
        setSelectedRecord(null);
      };

      const handleShareClick = () => {
        if (selectedRecord) {
          const shareData = {
            ...selectedRecord,
            id: selectedRecord.id,
            date: selectedRecord.date,
            proximityData: selectedRecord.proximityData,
            lightData: selectedRecord.lightData,
          };
          localStorage.setItem('shareData', JSON.stringify(shareData));
          router.push('/share');
        }else {
          alert('Please fill in all fields before sharing.');
        }
      };

      const isMatrixMode = (lightData: any): boolean => {
        return Array.isArray(lightData) && lightData.length >= 3;
      };

      const setElimnateTrue = () => {
        setEliminate(true);
      }

      const setElimniateFalse = () => {
        setEliminate(false);
      };
    

    return (
        <div className="flex flex-col h-screen justify-between"> 
            <div className="mx-4">
                <div className="bg-black text-white text-4xl text-center font-bold mb-10 mt-10">
                    RECORD
                </div> 
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                  {!selectedRecord ? (
                        <form>
                        <div className="space-y-4">
                            <div className="grid items-center">
                              {
                                (savedRecords.length > 0) ? (<div>
                                  {savedRecords.map((record, index) => (
                                    <div className="flex mb-10" key={index}>
                                        <label className="ml-10 text-sm font-medium text-gray-700" onClick={() => handleDoubleClick(record)}>TAG/SN/ID: {record.id}</label>
                                        <input type="checkbox" checked={selectedRecords.has(index)} onChange={() => handleCheckboxChange(index)} className="h-4 w-4 text-black-600 border-gray-300 rounded flex mx-5"/>
                                    </div>
                                ))}
                                </div>) : (
                                  <div className="flex justify-center mb-10">
                                    <label className=" text-2xl font-medium text-gray-700 text-center justify-center flex" >No records available</label>
                                  </div>
                                ) 
                              }
                                
                                
                            </div>
                        </div>
                         </form>
                  ) : (
                    <div className="space-y-5">
                      
                          <span className="close-button" onClick={closeDetails}>&times;</span>
                          <h1 className="text-2xl font-bold mb-4">Record Details</h1>
                          <p>{`MODE: ${isMatrixMode(selectedRecord.lightData) ? 'MATRIX' : 'GENERAL'}`}</p>
                          <p>{`DATE: ${selectedRecord.date}`}</p>
                          <p>{`TAG/SN/ID: ${selectedRecord.id}`}</p>
                          <p>OB.: </p>
                          <p>{`P(0,y) = ${selectedRecord.proximityData}`}</p>
                          {!isMatrixMode(selectedRecord.lightData) ? (
                            <p>{`G(x,y) = ${selectedRecord.lightData}`}</p>
                          ) : (
                            <div>
                               <p className="mb-5">{`G(x,y) =`}</p>
                               <p>{`T01 =${selectedRecord.lightData[0]}, T02 =${selectedRecord.lightData[1]}, TO3 = ${selectedRecord.lightData[2]}`}</p>
                               <p>{`T11 =${selectedRecord.lightData[3]}, T12 =${selectedRecord.lightData[4]}, T13 = ${selectedRecord.lightData[5]}`}</p>
                               <p>{`T21 =${selectedRecord.lightData[6]}, T22 =${selectedRecord.lightData[7]}, T23 = ${selectedRecord.lightData[8]}`}</p>
                            </div>     
                          )}
                         
                        
                    </div>
                  )}
                  {eliminate && (
                      <div className="popup-overlay">
                        <div className="popup-content">
                          <p className="text-2xl font-bold">Are you sure you want to delete the selected records?</p>
                          <div className="grid grid-cols-2 gap-2 mt-10">
                          <button className="rounded-full border border-gray-500 bg-gray-500 text-white flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-5 mx-5" onClick={setElimniateFalse}>No</button>
                               <button className="rounded-full border border-red-500 bg-red-500 text-white flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-5 mx-5" onClick={handleDeleteSelected}>Yes</button>
                          </div>

                          
                        </div>
                      </div>
                    )}

                </div>
            </div>
            <div className="ml-2 mx-2 grid"> 
                  {!selectedRecord ?  (
                    <div className="grid grid-cols-2 gap-2">
                      <button className="rounded-full border border-red-500 bg-red-500 text-white flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-5 mx-2" onClick={setElimnateTrue} disabled={selectedRecords.size === 0}>
                           DELETE 
                      </button>
                      <button className="rounded-full border border-blue-700 bg-blue-700 text-white flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-2 mx-5" onClick={handleShareSelected}>SHARE</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                            <button className="rounded-full border border-blue-500 bg-blue-500 text-white flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-5 mx-2"  onClick={closeDetails}>OK</button>
                            <button className="rounded-full border border-blue-700 bg-blue-700 text-white flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-2 mx-5" onClick={handleShareClick}>SHARE</button>
                    </div>
                  )}
                
                <BackButton/>
            </div>
            <style jsx>{`
              .close-button {
                float: right;
                font-size: 20px;
                cursor: pointer;
                background-color: red;
                padding: 5px 10px;
                color: white;
                border-radius: 5px;
              }
              .popup-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .popup-content {
                background: white;
                padding: 20px;
                border-radius: 5px;
                text-align: center;
              }

            `}</style>
        </div>
        
    )
}