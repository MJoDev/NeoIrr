"use client"
import { useEffect, useState } from "react"
import BackButton from "../components/BackButton/BackButton"
import { useBluetooth } from "../utils/BluetoothContext";

export default function RecordPage() {

    const [savedRecords, setSavedRecords] = useState<any[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<Set<number>>(new Set());
    const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

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
        localStorage.setItem('savedData', JSON.stringify(updatedRecords));
        setSelectedRecords(new Set());
      };
    
      const handleDoubleClick = (record: any) => {
        setSelectedRecord(record);
      };
    
      const closeDetails = () => {
        setSelectedRecord(null);
      };

      const handleShare = () => {
        if (selectedRecord) {
          const message = `ID: ${selectedRecord.id}\nDate: ${selectedRecord.date}\nP(0, y): ${selectedRecord.proximityData}\nG(x, y): ${selectedRecord.lightData.join(', ')}`;
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
        }
      };

      const handleShareEmail = () => {
        if (selectedRecord) {
          const subject = `Record ID: ${selectedRecord.id}`;
          const body = `ID: ${selectedRecord.id}\nDate: ${selectedRecord.date}\nP(0, y): ${selectedRecord.proximityData}\nG(x, y): ${selectedRecord.lightData.join(', ')}`;
          const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          window.open(mailtoUrl, '_blank');
        }
      };

      const isMatrixMode = (lightData: any): boolean => {
        return Array.isArray(lightData);
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
                                {savedRecords.map((record, index) => (
                                    <div className="flex mb-10" key={index} onClick={() => handleDoubleClick(record)}>
                                        <label className="ml-3 text-sm font-medium text-gray-700">TAG/SN/ID: {record.id}</label>
                                        <input type="checkbox" checked={selectedRecords.has(index)} onChange={() => handleCheckboxChange(index)} className="h-4 w-4 text-black-600 border-gray-300 rounded flex mx-5"/>
                                    </div>
                                ))}
                                
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
                         
                          
                          <div className="flex align-items-center mt-5">
                            <button className="rounded-full border border-green-500 bg-green-500 text-white flex justify-center items-center mb-10 text-sm gap-1 py-4 px-4 hover:scale-105 transition ml-2 mx-2" onClick={handleShare}>Share via WhatsApp</button>
                            <button className="rounded-full border border-red-500 bg-red-500 text-white flex justify-center items-center mb-10 text-sm gap-1 py-4 px-4 hover:scale-105 transition ml-2 mx-2" onClick={handleShareEmail}>Share via Email</button>
                          </div>
                          
                        
                    </div>
                  )}
                </div>
            </div>
            <div className="ml-2 mx-2 grid"> 
                <button className="rounded-full border border-red-500 bg-red-500 text-white flex justify-center items-center mb-5 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-5 mx-5" onClick={handleDeleteSelected} disabled={selectedRecords.size === 0}>
                    DELETE SELECTED
                </button>
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
            `}</style>
        </div>
        
    )
}